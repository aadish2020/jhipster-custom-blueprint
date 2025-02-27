# JHipster Custom Blueprint

This blueprint provides two major enhancements for JHipster 8.0.0 applications:
1. Local NPM configuration for environments with network restrictions
2. Modern UI components and styling system

## Local NPM Configuration

> Replaces frontend-maven-plugin with exec-maven-plugin for environments with network restrictions

This feature modifies a JHipster application to use locally installed Node.js and npm through the exec-maven-plugin instead of downloading them via frontend-maven-plugin. This is particularly useful in corporate environments with network restrictions.

### What This Feature Does

1. Completely removes the frontend-maven-plugin from pom.xml
2. Removes any Node.js/npm version properties from pom.xml
3. Adds exec-maven-plugin configured to use your locally installed npm
4. Configures the necessary Maven phases for npm operations (install, build, test)

## Modern UI Features

The blueprint also includes a comprehensive modern UI system that enhances the default JHipster frontend with:

### 1. Modern Layout System
- Responsive main layout with modern navigation
- Modernized navbar with improved mobile support
- Clean and consistent spacing using CSS variables
- Flexible grid and list view options

### 2. Enhanced Entity Management
- Modern list view with grid/list display options
- Enhanced detail view with improved data presentation
- Modern form layouts with advanced validation feedback
- Custom file upload component with drag & drop support

### 3. Styling System
- Modern CSS variables for consistent theming
- Enhanced typography and color systems
- Component-specific styles
- Responsive design patterns

## Prerequisites

- JHipster 8.0.0
- Node.js and npm installed locally
- Maven

## Installation

To install this blueprint:

```bash
# Clone the repository
git clone https://github.com/yourusername/generator-jhipster-custom-blueprint.git

# Go to the blueprint directory
cd generator-jhipster-custom-blueprint

# Install dependencies
npm install

# Link the blueprint globally
npm link
```

## Usage

To use the blueprint with a new JHipster application:

```bash
jhipster --blueprints custom-blueprint
```

To apply the blueprint to an existing JHipster project:

```bash
# Navigate to your JHipster project
cd my-jhipster-project

# Apply the blueprint
jhipster --blueprints custom-blueprint
```

## Development

To make changes to this blueprint:

1. Modify the files in the generators directory
2. Rerun the blueprint on a test project

### File Structure

```
generators/
├── angular/
│   ├── templates/
│   │   ├── src/main/webapp/
│   │   │   ├── app/
│   │   │   │   ├── entities/_common/
│   │   │   │   │   ├── list/
│   │   │   │   │   ├── detail/
│   │   │   │   │   └── update/
│   │   │   │   └── layouts/
│   │   │   └── content/
│   │   │       └── scss/
│   ├── files-angular.mjs
│   └── generator.mts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT