// File: generator-jhipster-local-npm/generators/server/index.js
import chalk from 'chalk';
import ServerGenerator from 'generator-jhipster/generators/server';

/**
 * Server generator for the JHipster Custom Blueprint
 * Extends the JHipster server generator to replace frontend-maven-plugin with exec-maven-plugin
 */
export default class extends ServerGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  get [ServerGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      displayLogo() {
        this.log(chalk.green('Running Custom Blueprint - Server Generator'));
        this.log(chalk.white('Replacing frontend-maven-plugin with exec-maven-plugin'));
      }
    });
  }

  get [ServerGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async modifyPomXml() {
        if (this.skipServer) return;
        
        this.log('Modifying pom.xml to replace frontend-maven-plugin with exec-maven-plugin');
        
        const pomPath = 'pom.xml';
        try {
          // Use editFile helper method instead of manual read/write
          this.editFile(pomPath, (content) => {
            // Remove frontend-maven-plugin completely
            let modifiedContent = content.replace(
              /<plugin>\s*<groupId>com\.github\.eirslett<\/groupId>\s*<artifactId>frontend-maven-plugin<\/artifactId>[\s\S]*?<\/plugin>/gm,
              ''
            );
            
            // Remove node.version and npm.version properties
            modifiedContent = modifiedContent.replace(
              /<node.version>.*?<\/node.version>/g,
              ''
            );
            modifiedContent = modifiedContent.replace(
              /<npm.version>.*?<\/npm.version>/g,
              ''
            );
            
            // Add exec-maven-plugin if it doesn't already exist
            if (!modifiedContent.includes('exec-maven-plugin')) {
              // Find the plugins section
              const pluginsEndIdx = modifiedContent.indexOf('</plugins>');
              if (pluginsEndIdx !== -1) {
                const execPluginContent = `
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>exec-maven-plugin</artifactId>
            <version>3.1.0</version>
            <executions>
                <!-- Install dependencies -->
                <execution>
                    <id>npm-install</id>
                    <goals>
                        <goal>exec</goal>
                    </goals>
                    <phase>generate-resources</phase>
                    <configuration>
                        <executable>npm</executable>
                        <arguments>
                            <argument>install</argument>
                        </arguments>
                    </configuration>
                </execution>
                
                <!-- Build for production -->
                <execution>
                    <id>npm-run-build</id>
                    <goals>
                        <goal>exec</goal>
                    </goals>
                    <phase>generate-resources</phase>
                    <configuration>
                        <executable>npm</executable>
                        <arguments>
                            <argument>run</argument>
                            <argument>build</argument>
                        </arguments>
                    </configuration>
                </execution>
                
                <!-- Test -->
                <execution>
                    <id>npm-run-test</id>
                    <goals>
                        <goal>exec</goal>
                    </goals>
                    <phase>test</phase>
                    <configuration>
                        <executable>npm</executable>
                        <arguments>
                            <argument>run</argument>
                            <argument>test</argument>
                        </arguments>
                        <skip>\${skipTests}</skip>
                    </configuration>
                </execution>
            </executions>
        </plugin>`;
                
                modifiedContent = modifiedContent.substring(0, pluginsEndIdx) + execPluginContent + modifiedContent.substring(pluginsEndIdx);
              }
            }
            
            // Also remove any frontend-related profiles if they exist
            modifiedContent = modifiedContent.replace(
              /<profile>\s*<id>.*?node.*?<\/profile>/gs,
              ''
            );
            
            return modifiedContent;
          });
          
          this.log(chalk.green('Successfully modified pom.xml to use exec-maven-plugin'));
        } catch (error) {
          this.log.error(`Error modifying pom.xml: ${error.message}`);
        }
      }
    });
  }

  get [ServerGenerator.END]() {
    return this.asEndTaskGroup({
      afterEnd() {
        this.log(chalk.bold.green('JHipster Custom Blueprint - Server Generator applied successfully!'));
        this.log('Your project now uses exec-maven-plugin instead of frontend-maven-plugin.');
      }
    });
  }
}
