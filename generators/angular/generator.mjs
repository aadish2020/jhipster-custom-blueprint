import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { files as angularFiles } from './files-angular.mjs';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Angular generator for the JHipster Custom Blueprint
 * Extends the JHipster base application generator to provide custom Angular components
 */
export default class extends BaseApplicationGenerator {
    constructor(args, options, features) {
        // Log constructor call for debugging
        console.log(chalk.bgRed.white('ANGULAR GENERATOR CONSTRUCTOR CALLED'));
        
        super(args, options, { ...features, sbsBlueprint: true });
        
        // Log more info after initialization
        console.log(chalk.bgRed.white('ANGULAR GENERATOR INITIALIZED'));
        console.log('Generator name:', this.options.name);
        
        // The template path will be set in the initializing phase
        this._templatePath = null;

        // Set skipInstall to true to prevent package.json modifications during development
        this.options.skipInstall = true;
    }

    // Priority needs to be higher than the default JHipster generator
    get priority() {
        return 100; // Higher than default JHipster priority
    }

    // Define jhipsterTemplatePath as a function instead of a getter
    jhipsterTemplatePath() {
        return path.join(__dirname, 'templates');
    }

    get [BaseApplicationGenerator.INITIALIZING]() {
        return this.asInitializingTaskGroup({
            displayLogo() {
                this.log(chalk.green('Running Modern UI Blueprint - Angular Generator'));
                this._templatePath = path.resolve(__dirname, 'templates');
                this.sourceRoot(this._templatePath);

                // Set skipInstall to true to prevent package.json modifications
                this.options.skipInstall = true;

                // Remove blueprint from package.json if it exists
                this.removeBlueprint();
            }
        });
    }

    // Add a method to remove the blueprint from package.json
    removeBlueprint() {
        const blueprintName = 'generator-jhipster-custom-blueprint';
        const packageJsonPath = this.destinationPath('package.json');
        
        if (fs.existsSync(packageJsonPath)) {
            try {
                const packageJson = this.readDestinationJSON('package.json');
                let modified = false;

                // Check in dependencies
                if (packageJson.dependencies && packageJson.dependencies[blueprintName]) {
                    delete packageJson.dependencies[blueprintName];
                    modified = true;
                }

                // Check in devDependencies
                if (packageJson.devDependencies && packageJson.devDependencies[blueprintName]) {
                    delete packageJson.devDependencies[blueprintName];
                    modified = true;
                }

                // Save changes if needed
                if (modified) {
                    this.writeDestinationJSON('package.json', packageJson);
                    this.log(chalk.green('✓ Removed blueprint from package.json for local development'));
                }
            } catch (error) {
                this.log(chalk.yellow('Warning: Could not modify package.json:', error.message));
            }
        }
    }

    get [BaseApplicationGenerator.PROMPTING]() {
        return this.asPromptingTaskGroup({
            async promptingTemplateTask() {
                // Add any prompts if needed
                this.log(chalk.bgRed.white('ANGULAR GENERATOR PROMPTING - DEBUG CHECK'));
            },
        });
    }

    get [BaseApplicationGenerator.CONFIGURING]() {
        return this.asConfiguringTaskGroup({
            async configuringTemplateTask() {
                // Add configuration tasks
                this.log(chalk.bgRed.white('ANGULAR GENERATOR CONFIGURING - DEBUG CHECK'));
            },
        });
    }

    get [BaseApplicationGenerator.COMPOSING]() {
        return this.asComposingTaskGroup({
            async composingTemplateTask() {
                // Add composition tasks
                this.log(chalk.bgRed.white('ANGULAR GENERATOR COMPOSING - DEBUG CHECK'));
            },
        });
    }

    get [BaseApplicationGenerator.LOADING]() {
        return this.asLoadingTaskGroup({
            async loadingTemplateTask() {
                // Add loading tasks
                this.log(chalk.bgRed.white('ANGULAR GENERATOR LOADING - DEBUG CHECK'));
            },
        });
    }

    get [BaseApplicationGenerator.PREPARING]() {
        return this.asPreparingTaskGroup({
            async preparingTemplateTask() {
                // Add preparation tasks
                this.log(chalk.bgRed.white('ANGULAR GENERATOR PREPARING - DEBUG CHECK'));
                
                // Ensure template directories exist or create them
                this.ensureDirectories();
            },
        });
    }

    get [BaseApplicationGenerator.WRITING]() {
        return this.asWritingTaskGroup({
            async writingTemplateTask() {
                this.log(chalk.yellow('Writing template files...'));
                
                try {
                    // Ensure directories exist first
                    this.ensureDirectories();

                    // Prepare the context for templates
                    const context = this.prepareAngularContext();

                    // Log template paths for debugging
                    const templateRoot = this.jhipsterTemplatePath();
                    this.log(chalk.blue('Template root path:', templateRoot));

                    // First, create necessary directories
                    const directories = [
                        'src/main/webapp/content/scss',
                        'src/main/webapp/app/layouts/main',
                        'src/main/webapp/app/layouts/navbar',
                        'src/main/webapp/app/entities/_common/list',
                        'src/main/webapp/app/entities/_common/detail',
                        'src/main/webapp/app/entities/_common/update'
                    ];

                    directories.forEach(dir => {
                        const fullPath = this.destinationPath(dir);
                        if (!fs.existsSync(fullPath)) {
                            fs.mkdirSync(fullPath, { recursive: true });
                            this.log(chalk.green(`Created directory: ${dir}`));
                        }
                    });

                    // Write files using the angularFiles configuration
                    await this.writeFiles({
                        sections: angularFiles,
                        context: context,
                        rootTemplatesPath: templateRoot
                    });

                    // Verify files were written
                    const filesToVerify = [
                        'src/main/webapp/app/layouts/navbar/navbar.component.html',
                        'src/main/webapp/app/layouts/main/main.component.html',
                        'src/main/webapp/content/scss/global.scss'
                    ];

                    filesToVerify.forEach(file => {
                        const fullPath = this.destinationPath(file);
                        if (fs.existsSync(fullPath)) {
                            this.log(chalk.green(`✓ File exists: ${file}`));
                        } else {
                            this.log(chalk.yellow(`⚠️ File not found: ${file}`));
                        }
                    });

                    this.log(chalk.green('✓ Template files written successfully'));
                } catch (error) {
                    this.log(chalk.red('Error writing template files:'), error);
                    // Log more details about the error
                    if (error.code === 'ENOENT') {
                        this.log(chalk.yellow('File not found error details:'));
                        this.log('Path:', error.path);
                        this.log('Template root:', this.jhipsterTemplatePath());
                    }
                    throw error;
                }
            }
        });
    }

    get [BaseApplicationGenerator.POST_WRITING]() {
        return this.asPostWritingTaskGroup({
            async customizeAngularFiles() {
                // Remove blueprint again in case it was added during the process
                this.removeBlueprint();

                // Update angular.json to include our SCSS files
                const angularJson = this.readDestinationJSON('angular.json');
                if (angularJson?.projects?.['jhipster']?.architect?.build?.options?.styles) {
                    const styles = angularJson.projects['jhipster'].architect.build.options.styles;
                    if (!styles.includes('src/main/webapp/content/scss/global.scss')) {
                        styles.push('src/main/webapp/content/scss/global.scss');
                        this.writeDestinationJSON('angular.json', angularJson);
                    }
                }
            }
        });
    }

    get [BaseApplicationGenerator.END]() {
        return this.asEndTaskGroup({
            async endTemplateTask() {
                // Final check to remove blueprint
                this.removeBlueprint();

                this.log(chalk.bold.green('JHipster Custom Blueprint - Angular Generator completed'));
                this.log(chalk.yellow('Summary of operations:'));
                this.log('- Dependencies installed');
                this.log('- Template files written/copied');
                this.log('- Angular configuration updated');
                this.log(chalk.blue('Please check the logs above for any errors or warnings.'));
                this.log(chalk.bgRed.white('ANGULAR GENERATOR END - DEBUG CHECK'));
            },
        });
    }

    /**
     * Lists all files in a directory recursively
     */
    listFilesRecursively(dir, prefix = '') {
        if (!fs.existsSync(dir)) {
            this.log(`Directory not found: ${dir}`);
            return;
        }

        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const relativePath = prefix ? `${prefix}/${file}` : file;
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                this.log(`DIR: ${relativePath}`);
                this.listFilesRecursively(fullPath, relativePath);
            } else {
                this.log(`FILE: ${relativePath}`);
            }
        }
    }

    /**
     * Copies a directory recursively
     */
    copyDirectory(sourceDir, destDir, options = {}) {
        if (!fs.existsSync(sourceDir)) {
            this.log(chalk.red(`Source directory does not exist: ${sourceDir}`));
            return;
        }

        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
            this.log(chalk.green(`Created directory: ${destDir}`));
        }

        const files = fs.readdirSync(sourceDir);
        let filesCopied = 0;

        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);
            const stats = fs.statSync(sourcePath);

            if (stats.isDirectory()) {
                this.copyDirectory(sourcePath, destPath, options);
            } else {
                try {
                    // Handle EJS templates if needed
                    if (file.endsWith('.ejs') && options.processEjs) {
                        // We can add EJS processing here if needed
                        // For now, just copy the file as is
                        fs.copyFileSync(sourcePath, destPath);
                    } else {
                        fs.copyFileSync(sourcePath, destPath);
                    }
                    filesCopied++;
                    this.log(chalk.green(`✓ Copied ${file} to ${destPath}`));
                } catch (error) {
                    this.log(chalk.red(`✗ Error copying file ${file}:`), error);
                }
            }
        }

        this.log(chalk.green(`✓ Copied ${filesCopied} files from ${sourceDir} to ${destDir}`));
    }

    /**
     * Create fallback SCSS files if templates don't exist
     */
    createFallbackScssFiles() {
        this.log(chalk.yellow('Creating fallback SCSS files...'));
        try {
            const scssDestPath = this.destinationPath('src/main/webapp/content/scss');
            
            // Ensure the destination directory exists
            if (!fs.existsSync(scssDestPath)) {
                fs.mkdirSync(scssDestPath, { recursive: true });
                this.log(chalk.green(`Created directory: ${scssDestPath}`));
            }
            
            // Create _modern-variables.scss
            fs.writeFileSync(
                path.join(scssDestPath, '_modern-variables.scss'),
                `:root {
  --primary-color: #3e8acc;
  --secondary-color: #172B4d;
  --success-color: #28a745;
  --info-color: #17a2b8;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  
  --light-bg: #f8f9fa;
  --dark-bg: #343a40;
  
  --border-radius: 0.25rem;
  --box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  --transition-time: 0.3s;
}
`
            );
            
            // Create _modern-components.scss
            fs.writeFileSync(
                path.join(scssDestPath, '_modern-components.scss'),
                `.modern-card {
  background-color: var(--light-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform var(--transition-time);
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .card-title {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  .card-body {
    color: var(--dark-bg);
  }
}

.modern-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color var(--transition-time);
  
  &:hover {
    background-color: darken(var(--primary-color), 10%);
  }
  
  &.secondary {
    background-color: var(--secondary-color);
  }
  
  &.success {
    background-color: var(--success-color);
  }
  
  &.danger {
    background-color: var(--danger-color);
  }
}
`
            );
            
            // Create _modern-entity.scss
            fs.writeFileSync(
                path.join(scssDestPath, '_modern-entity.scss'),
                `.entity-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  .entity-card {
    background-color: var(--light-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.5rem;
    transition: transform var(--transition-time);
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .entity-title {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .entity-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .entity-field {
        display: flex;
        justify-content: space-between;
        
        .field-label {
          font-weight: 500;
          color: var(--secondary-color);
        }
        
        .field-value {
          color: var(--dark-bg);
        }
      }
    }
    
    .entity-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }
}

.entity-detail-container {
  padding: 1.5rem;
  
  .entity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    .entity-title {
      color: var(--primary-color);
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .entity-actions {
      display: flex;
      gap: 0.5rem;
    }
  }
  
  .entity-card {
    background-color: var(--light-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.5rem;
    
    .entity-fields {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      
      .entity-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        
        .field-label {
          font-weight: 500;
          color: var(--secondary-color);
        }
        
        .field-value {
          color: var(--dark-bg);
          padding: 0.5rem;
          background-color: white;
          border-radius: var(--border-radius);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
`
            );
            
            // Update global.scss
            fs.writeFileSync(
                path.join(scssDestPath, 'global.scss'),
                `@import 'bootstrap-variables';
@import 'modern-variables';
@import 'modern-components';
@import 'modern-entity';

/* ==============================================================
Main scss styles
===============================================================*/

html {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: var(--light-bg);
  margin: 0;
  padding: 0;
  height: 100%;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.container-fluid {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.card {
  @extend .modern-card;
}

.btn-primary {
  @extend .modern-button;
}

.btn-secondary {
  @extend .modern-button.secondary;
}

.btn-success {
  @extend .modern-button.success;
}

.btn-danger {
  @extend .modern-button.danger;
}
`
            );
            
            this.log(chalk.green('✓ Fallback SCSS files created successfully'));
        } catch (error) {
            this.log(chalk.red('✗ Error creating fallback SCSS files:'), error);
        }
    }

    /**
     * Prepare the Angular context for templates
     */
    prepareAngularContext() {
        return {
            ...this.jhipsterContext,
            modern: {
                version: '1.0.0',
                theme: 'modern'
            }
        };
    }

    /**
     * Safely stringify context object handling circular references
     */
    stringifyContext(obj) {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return '[Circular Reference]';
                }
                seen.add(value);
            }
            return value;
        }, 2);
    }

    /**
     * Install dependencies if needed
     */
    async dependencyInstall() {
        this.log(chalk.yellow('Installing additional Angular dependencies...'));
        try {
            // Find package.json in various possible locations
            let packageJsonPath = this.destinationPath('package.json');
            if (!fs.existsSync(packageJsonPath)) {
                packageJsonPath = this.destinationPath('../package.json');
            }
            
            if (!fs.existsSync(packageJsonPath)) {
                // Try to find the parent JHipster app directory
                const potentialPaths = [
                    path.resolve(process.cwd(), '../'),  // One level up
                    path.resolve(process.cwd(), '../../') // Two levels up
                ];
                
                for (const potentialPath of potentialPaths) {
                    const testPath = path.join(potentialPath, 'package.json');
                    if (fs.existsSync(testPath)) {
                        packageJsonPath = testPath;
                        this.log(chalk.green('✓ Found package.json at:'), packageJsonPath);
                        break;
                    }
                }
            }
            
            if (!fs.existsSync(packageJsonPath)) {
                this.log(chalk.red('✗ package.json not found at:'), packageJsonPath);
                this.log(chalk.yellow('⚠️ Will create initial package.json'));
                
                // Create a minimal package.json
                const initialPackageJson = {
                    name: "jhipster-client",
                    version: "0.0.1",
                    description: "JHipster client with modern UI",
                    dependencies: {
                        "@angular/cdk": "^16.0.0",
                        "@angular/material": "^16.0.0",
                        "ngx-dropzone": "^3.1.0"
                    }
                };
                
                fs.writeFileSync(
                    this.destinationPath('package.json'), 
                    JSON.stringify(initialPackageJson, null, 2)
                );
                this.log(chalk.green('✓ Created initial package.json'));
                return;
            }

            const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            this.log(chalk.blue('Current dependencies:'), packageJson.dependencies);

            const dependencies = {
                '@angular/cdk': '^16.0.0',
                '@angular/material': '^16.0.0',
                'ngx-dropzone': '^3.1.0'
            };

            // Remove the blueprint from dependencies if it exists
            const blueprintName = 'generator-jhipster-custom-blueprint';
            if (packageJson.dependencies && packageJson.dependencies[blueprintName]) {
                this.log(chalk.yellow(`⚠️ Removing ${blueprintName} from package.json`));
                delete packageJson.dependencies[blueprintName];
            }

            // Add our dependencies
            if (!packageJson.dependencies) {
                packageJson.dependencies = {};
            }
            Object.assign(packageJson.dependencies, dependencies);
            
            // Write the updated package.json
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            this.log(chalk.green('✓ Dependencies configured:'), dependencies);
            
        } catch (error) {
            this.log(chalk.red('✗ Error in dependencyInstall:'), error);
            throw error;
        }
    }
    
    /**
     * Ensure template directories exist
     */
    ensureDirectories() {
        const directories = [
            'src/main/webapp/content/scss',
            'src/main/webapp/app/layouts',
            'src/main/webapp/app/entities/_common/list',
            'src/main/webapp/app/entities/_common/detail',
            'src/main/webapp/app/entities/_common/update'
        ];
        
        this.log(chalk.yellow('Ensuring template directories exist...'));
        
        // Create directories in the destination
        directories.forEach(dir => {
            const fullPath = this.destinationPath(dir);
            if (!fs.existsSync(fullPath)) {
                this.log(`Creating directory: ${dir}`);
                fs.mkdirSync(fullPath, { recursive: true });
            }
        });
        
        this.log(chalk.green('✓ Template directories created'));
    }

    /**
     * Helper method to copy template files
     */
    async copyTemplateFiles(sourcePath, destPath, extensions = ['.scss']) {
        try {
            // Create destination directory if it doesn't exist
            this.mkdirp(destPath);

            // Read all files from source directory recursively
            const files = this.fs.read(sourcePath);
            
            for (const file of files) {
                const ext = path.extname(file);
                if (extensions.includes(ext)) {
                    this.fs.copy(
                        path.join(sourcePath, file),
                        this.destinationPath(path.join(destPath, file)),
                        { globOptions: { dot: true } }
                    );
                }
            }
        } catch (error) {
            this.log(`Error copying files from ${sourcePath}: ${error.message}`);
        }
    }
} 