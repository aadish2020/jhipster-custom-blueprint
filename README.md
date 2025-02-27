# JHipster Local NPM Blueprint

> JHipster blueprint that replaces frontend-maven-plugin with exec-maven-plugin for environments with network restrictions

This blueprint modifies a JHipster 8.0.0 application to use locally installed Node.js and npm through the exec-maven-plugin instead of downloading them via frontend-maven-plugin. This is particularly useful in corporate environments with network restrictions.

## What This Blueprint Does

1. Completely removes the frontend-maven-plugin from pom.xml
2. Removes any Node.js/npm version properties from pom.xml
3. Adds exec-maven-plugin configured to use your locally installed npm
4. Configures the necessary Maven phases for npm operations (install, build, test)

## Prerequisites

- JHipster 8.0.0
- Node.js and npm installed locally
- Maven

## Installation

To install this blueprint:

```bash
# Clone the repository
git clone https://github.com/yourusername/generator-jhipster-local-npm.git

# Go to the blueprint directory
cd generator-jhipster-local-npm

# Install dependencies
npm install

# Link the blueprint globally
npm link
```

## Usage

To use the blueprint with a new JHipster application:

```bash
jhipster --blueprints local-npm
```

To apply the blueprint to an existing JHipster project:

```bash
# Navigate to your JHipster project
cd my-jhipster-project

# Apply the blueprint
jhipster --blueprints local-npm
```

## Development

To make changes to this blueprint:

1. Modify the files in the generators directory
2. Rerun the blueprint on a test project

## License

MIT