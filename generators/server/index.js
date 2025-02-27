// File: generator-jhipster-local-npm/generators/server/index.js
const chalk = require('chalk');
const { ServerGenerator } = require('generator-jhipster/generators/server');

module.exports = class extends ServerGenerator {
  constructor(args, options, features) {
    super(args, options, features);

    if (this.options.help) return;
  }

  get initializing() {
    const phaseFromJHipster = super.initializing;
    const customInitPhase = {
      displayLogo() {
        this.log(chalk.green('Running Local NPM Blueprint - Server Generator'));
        this.log(chalk.white('Replacing frontend-maven-plugin with exec-maven-plugin'));
      }
    };
    return Object.assign(phaseFromJHipster, customInitPhase);
  }

  get writing() {
    const phaseFromJHipster = super.writing;
    const customPhase = {
      modifyPomXml() {
        if (this.skipServer) return;
        
        this.log('Modifying pom.xml to replace frontend-maven-plugin with exec-maven-plugin');
        
        const pomPath = 'pom.xml';
        try {
          let pomContent = this.fs.read(pomPath);
          
          // Remove frontend-maven-plugin completely
          pomContent = pomContent.replace(
            /<plugin>\s*<groupId>com\.github\.eirslett<\/groupId>\s*<artifactId>frontend-maven-plugin<\/artifactId>[\s\S]*?<\/plugin>/gm,
            ''
          );
          
          // Remove node.version and npm.version properties
          pomContent = pomContent.replace(
            /<node.version>.*?<\/node.version>/g,
            ''
          );
          pomContent = pomContent.replace(
            /<npm.version>.*?<\/npm.version>/g,
            ''
          );
          
          // Add exec-maven-plugin if it doesn't already exist
          if (!pomContent.includes('exec-maven-plugin')) {
            // Find the plugins section
            const pluginsEndIdx = pomContent.indexOf('</plugins>');
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
              
              pomContent = pomContent.substring(0, pluginsEndIdx) + execPluginContent + pomContent.substring(pluginsEndIdx);
            }
          }
          
          // Also remove any frontend-related profiles if they exist
          pomContent = pomContent.replace(
            /<profile>\s*<id>.*?node.*?<\/profile>/gs,
            ''
          );
          
          this.fs.write(pomPath, pomContent);
          this.log(chalk.green('Successfully modified pom.xml to use exec-maven-plugin'));
        } catch (error) {
          this.log.error(`Error modifying pom.xml: ${error.message}`);
        }
      }
    };
    return Object.assign(phaseFromJHipster, customPhase);
  }

  get end() {
    const phaseFromJHipster = super.end;
    const customPhase = {
      afterEnd() {
        this.log(chalk.bold.green('JHipster Local NPM Blueprint applied successfully!'));
        this.log('Your project now uses exec-maven-plugin instead of frontend-maven-plugin.');
      }
    };
    return Object.assign(phaseFromJHipster, customPhase);
  }
};
