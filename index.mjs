/**
 * JHipster Custom Blueprint
 * A blueprint for JHipster that replaces frontend-maven-plugin with exec-maven-plugin
 * and provides custom UI components.
 */

// Export generators
export { default as app } from './generators/app/index.mjs';
export { default as server } from './generators/server/index.mjs';
export { default as angular } from './generators/angular/generator.mts';

// Blueprint configuration
export const blueprint = {
  name: 'generator-jhipster-custom-blueprint',
  version: '0.1.0',
  description: 'JHipster blueprint with local npm configuration and modern UI components',
  priority: 100 // Higher priority means this blueprint will be applied after other blueprints
};

// Generator configuration
export const generatorDefaults = {
  appName: 'JHipsterCustomApp',
  serverPort: 8080
};

// Default export for direct import
export default {
  generators: {
    app,
    server,
    angular
  },
  blueprint,
  generatorDefaults
}; 