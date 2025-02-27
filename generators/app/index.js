const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.log(chalk.green('Running Local NPM Blueprint - App Generator'));
    this.log(chalk.white('This blueprint replaces frontend-maven-plugin with exec-maven-plugin'));
  }

  writing() {
    // Your writing tasks here
  }

  end() {
    this.log('Local NPM Blueprint finished');
  }
};
