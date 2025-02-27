import chalk from 'chalk';
import AppGenerator from 'generator-jhipster/generators/app';

/**
 * Main application generator for the JHipster Custom Blueprint
 * Extends the JHipster app generator to provide custom functionality
 */
export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });

    // Add any custom options here
    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });
  }

  get [AppGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      displayLogo() {
        if (!this.options['skip-welcome-message']) {
          this.log(chalk.green('Running Custom Blueprint - App Generator'));
          this.log(chalk.white('This will set up a JHipster application with custom configurations'));
        }
      },
      checkJhipster() {
        const currentJhipsterVersion = this.jhipsterConfig.jhipsterVersion;
        const minimumJhipsterVersion = '8.0.0';
        
        if (!currentJhipsterVersion) {
          this.warning(`Could not detect current JHipster version, make sure you're using at least ${minimumJhipsterVersion}`);
        } else if (currentJhipsterVersion < minimumJhipsterVersion) {
          this.error(`This blueprint requires JHipster version >= ${minimumJhipsterVersion}`);
        }
      }
    });
  }

  get [AppGenerator.END]() {
    return this.asEndTaskGroup({
      afterEnd() {
        this.log(chalk.bold.green('JHipster Custom Blueprint applied successfully!'));
        this.log('Your application has been set up with custom configurations.');
      }
    });
  }
} 