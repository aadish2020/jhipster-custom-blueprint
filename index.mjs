/**
 * JHipster Custom Blueprint
 * A blueprint for JHipster that replaces frontend-maven-plugin with exec-maven-plugin
 * and provides custom UI components.
 */

import AppGenerator from './generators/app/index.mjs';
import ServerGenerator from './generators/server/index.mjs';
import AngularGenerator from './generators/angular/generator.mjs';

// Explicit generator exports
export { default as app } from './generators/app/index.mjs';
export { default as server } from './generators/server/index.mjs';
export { default as angular } from './generators/angular/index.mjs';

// Blueprint configuration
export const blueprint = {
  name: 'generator-jhipster-custom-blueprint',
  version: '0.1.0',
  description: 'JHipster blueprint with local npm configuration and modern UI components',
  priority: 100, // Higher priority means this blueprint will be applied after other blueprints
  generators: {
    app: {
      priority: 100,
      extends: 'jhipster:app',
      generator: AppGenerator
    },
    server: {
      priority: 100,
      extends: 'jhipster:server',
      generator: ServerGenerator
    },
    client: {
      priority: 100,
      extends: 'jhipster:angular',
      generator: AngularGenerator
    }
  }
};

// Generator configuration
export const generatorDefaults = {
  appName: 'JHipsterCustomApp',
  serverPort: 8080
};

// Default export for direct import
export default {
  blueprint,
  generatorDefaults
}; 