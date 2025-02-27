# JHipster Blueprint UI Template Guidelines

## Table of Contents
- [Blueprint Structure](#blueprint-structure)
- [Design System](#design-system)
- [Template Customization](#template-customization)
- [Development Standards](#development-standards)
- [JavaScript Module Systems](#javascript-module-systems)
- [Best Practices](#best-practices)

## Blueprint Structure

### 1. Generator Organization
```
generators/
├── angular/
│   ├── needle-api/          # For injecting code into existing files
│   ├── templates/           # Your custom UI templates
│   │   ├── src/
│   │   │   ├── main/webapp/
│   │   │   │   ├── app/    # Angular application files
│   │   │   │   ├── content/# Static resources
│   │   │   │   └── i18n/   # Internationalization
│   │   └── package.json    # Frontend dependencies
│   ├── files-angular.mjs   # File mappings
│   └── generator.mts       # Main generator logic
└── common/                 # Shared resources
```

### 2. Template Override Strategy
- **Priority Levels**:
  ```typescript
  const files = {
    common: [
      {
        templates: [
          'common/template.html',
        ],
      }
    ],
    angular: [
      {
        path: ANGULAR_DIR,
        templates: [
          'src/main/webapp/app/layout/main.component.html',
        ],
      }
    ]
  };
  ```

## Design System

### 1. JHipster-Specific Styling
- **Theme Variables**:
  ```scss
  $jhipster-colors: (
    'primary': #3e8acc,
    'secondary': #172B4d,
    'success': #28a745,
    'info': #17a2b8,
    'warning': #ffc107,
    'danger': #dc3545
  );
  ```

### 2. Component Templates
- **Base Components**:
  ```
  templates/
  ├── src/main/webapp/app/
  │   ├── layouts/
  │   │   ├── main/
  │   │   ├── navbar/
  │   │   └── footer/
  │   ├── shared/
  │   │   ├── alert/
  │   │   ├── buttons/
  │   │   └── components/
  │   └── entities/
  ```

## Template Customization

### 1. Needle API Usage
```typescript
export class AngularGenerator {
  addEntityToMenu(routerName, enableTranslation, entityTranslationKeyMenu) {
    this.needleApi.addEntityToMenu(
      routerName,
      enableTranslation,
      entityTranslationKeyMenu
    );
  }
}
```

### 2. File Overrides
- **Override Priority**:
  1. Blueprint custom templates
  2. JHipster default templates
  3. Base templates

### 3. Entity Templates
```
templates/
├── entity/
│   ├── detail/
│   ├── list/
│   ├── update/
│   └── delete/
```

## Development Standards

### 1. Angular Customization
- Use JHipster's Angular conventions
- Maintain compatibility with JHipster's authentication
- Follow JHipster's i18n structure
- Preserve entity management features

### 2. SCSS Organization
```
webapp/
├── content/
│   └── scss/
│       ├── _bootstrap-variables.scss
│       ├── _variables.scss
│       ├── global.scss
│       └── vendor.scss
```

### 3. Component Structure
```typescript
@Component({
  selector: 'jhi-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponent implements OnInit {
  // Follow JHipster naming conventions
}
```

## JavaScript Module Systems

### 1. ES Modules Configuration
- **Package.json Setup**:
  ```json
  {
    "type": "module",
    "main": "generators/app/index.mjs",
    "exports": {
      ".": "./generators/app/index.mjs",
      "./generators/*": "./generators/*/index.mjs"
    }
  }
  ```

### 2. File Extensions
- Use `.mjs` for JavaScript ES modules
- Use `.mts` for TypeScript ES modules
- Use `.cjs` only if CommonJS is absolutely required

### 3. Import/Export Syntax
```javascript
// Correct ES Module imports
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import { files as angularFiles } from './files-angular.mjs';

// Correct ES Module exports
export default class AppGenerator extends Generator {
  // Implementation
}
```

### 4. JHipster-Specific Import Paths
```javascript
// CORRECT: Import JHipster generators without /index.js or /index.mjs
import ServerGenerator from 'generator-jhipster/generators/server';
import AngularGenerator from 'generator-jhipster/generators/angular';

// INCORRECT: These will cause module not found errors
// import ServerGenerator from 'generator-jhipster/generators/server/index.js';
// import ServerGenerator from 'generator-jhipster/generators/server/index.mjs';
```

### 5. TypeScript Configuration
```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16",
    "target": "ES2022",
    "esModuleInterop": true
  }
}
```

### 6. Module Resolution Strategy
- Always use relative paths for local imports (`./path/to/file.mjs`)
- Use package names for external dependencies (`generator-jhipster/generators/...`)
- Explicitly include file extensions in imports for local files (`.mjs`, `.mts`)
- Do NOT include file extensions when importing JHipster generators

### 7. Extending JHipster Generators

There are several approaches to extending JHipster generators, but the recommended modern approach is using task groups with the `sbsBlueprint: true` option:

#### Modern Approach: Using Task Groups (Recommended for JHipster v8+)

```javascript
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import chalk from 'chalk';

/**
 * Custom generator for the JHipster Blueprint
 */
export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    // The sbsBlueprint: true option is crucial for proper integration
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  // Only implement the specific lifecycle phases you need to customize
  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      displayLogo() {
        this.log(chalk.green('Running Custom Blueprint'));
        this.log(chalk.white('Customizing JHipster application'));
      },
      // Add more initialization tasks as needed
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.asWritingTaskGroup({
      async customizeFiles() {
        // Use editFile helper for modifying existing files
        this.editFile('path/to/file.ext', (content) => {
          // Modify content as needed
          return modifiedContent;
        });
        
        // Use writeFiles for adding new files
        await this.writeFiles({
          sections: yourFileDefinitions,
          context: this.prepareContext(),
        });
      }
    });
  }

  get [BaseApplicationGenerator.END]() {
    return this.asEndTaskGroup({
      afterEnd() {
        this.log(chalk.bold.green('Custom Blueprint applied successfully!'));
      }
    });
  }
}
```

Key benefits of this approach:
- Only overrides the specific lifecycle phases you need to customize
- Uses task group methods for better organization
- Leverages JHipster's helper methods like `editFile` and `writeFiles`
- Properly integrates with JHipster's blueprint system via `sbsBlueprint: true`

#### Legacy Approaches (For Reference Only)

##### Approach 1: Using Getter Methods (Object Pattern)
```javascript
// Using getter methods to extend JHipster generators
import AppGenerator from 'generator-jhipster/generators/app';

export default class extends AppGenerator {
  constructor(args, opts) {
    super(args, opts);
  }

  // Use getter methods to access and extend JHipster lifecycle phases
  get initializing() {
    const phaseFromJHipster = super.initializing;
    const customPhase = {
      displayLogo() {
        this.log('Custom blueprint initializing');
      }
    };
    return Object.assign(phaseFromJHipster, customPhase);
  }

  // Always include all lifecycle phases, even if just passing through
  get prompting() {
    return super.prompting;
  }
  
  get configuring() {
    return super.configuring;
  }
  
  // etc. for all JHipster phases
}
```

##### Approach 2: Using Direct Methods (Function Pattern)
```javascript
// Using direct methods to extend JHipster generators
import AppGenerator from 'generator-jhipster/generators/app';

export default class extends AppGenerator {
  constructor(args, opts) {
    super(args, opts);
  }

  // Define standard methods that Yeoman can recognize
  initializing() {
    // Call parent method first to ensure JHipster functionality
    super.initializing();
    
    // Add your custom initialization code
    this.log('Custom blueprint initializing');
  }

  prompting() {
    return super.prompting();
  }
  
  configuring() {
    return super.configuring();
  }
  
  // etc. for all JHipster phases
}
```

##### Approach 3: Using Phase Constants (TypeScript Pattern)
```typescript
// Using phase constants with TypeScript
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';

export default class CustomGenerator extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return {
      async initializingTask(this: CustomGenerator): Promise<void> {
        this.log('Custom blueprint initializing');
      },
    };
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return {
      async promptingTask(this: CustomGenerator): Promise<void> {
        // Prompting tasks
      },
    };
  }
  
  // etc. for all JHipster phases
}
```

#### Which Approach to Choose?

- **Modern Task Groups (Recommended)**: For JHipster v8+, use the task group pattern with `sbsBlueprint: true` for the best integration and most maintainable code.
- **Getter Methods (Approach 1)**: For older JHipster versions, use this when you need to merge your custom code with JHipster's existing functionality.
- **Direct Methods (Approach 2)**: Simpler to understand and works well when you're calling the parent methods directly.
- **Phase Constants (Approach 3)**: A stepping stone to the modern approach, useful for TypeScript generators.

For new blueprints targeting JHipster v8+, always use the modern task group approach.

## Best Practices

### 1. Blueprint-Specific Practices
- Maintain compatibility with JHipster upgrades
- Use needle API for file modifications
- Follow JHipster's naming conventions
- Preserve existing functionality while adding new features

### 2. Testing Strategy
```
tests/
├── jest.conf.js
├── spec/
│   └── app/
│       ├── core/
│       ├── shared/
│       └── entities/
```

### 3. Integration Guidelines
- Test with different JHipster options
- Verify entity generation compatibility
- Check i18n integration
- Validate authentication flows

### 4. Performance Considerations
- Maintain JHipster's lazy loading
- Preserve bundle optimization
- Keep entity pagination
- Support JHipster's caching

### 5. Accessibility
- Maintain JHipster's ARIA attributes
- Preserve keyboard navigation
- Keep screen reader support
- Follow JHipster's form validation

### 6. Version Control
- Follow JHipster's release cycle
- Tag versions matching JHipster
- Document breaking changes
- Maintain upgrade path 

## UI Modernization Guidelines

### 1. Modern Layout Patterns
- **Flexible Grid System**
  ```scss
  .jhi-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }
  ```
- **Component Layouts**:
  - Use CSS Grid for page-level layouts
  - Implement Flexbox for component alignment
  - Add responsive breakpoints matching modern standards
  - Maintain JHipster's routing structure

### 2. Visual Enhancement Strategy
- **Modern Card Design**:
  ```scss
  .jhi-card {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }
  }
  ```

- **Enhanced Form Styling**:
  ```scss
  .jhi-form-group {
    position: relative;
    margin-bottom: var(--spacing-4);

    .form-control {
      border-width: 2px;
      transition: border-color 0.2s, box-shadow 0.2s;
      
      &:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
      }
    }

    label {
      transform: translateY(-2rem);
      transition: all 0.2s;
      font-weight: 500;
    }
  }
  ```

### 3. Component Modernization
- **Entity List Updates**:
  ```typescript
  @Component({
    selector: 'jhi-entity-list',
    template: `
      <div class="modern-list-container">
        <div class="list-header">
          <h2>{{ title | translate }}</h2>
          <div class="actions">
            <button class="btn-modern">
              <span class="icon">+</span>
              {{ 'entity.action.add' | translate }}
            </button>
          </div>
        </div>
        <!-- Maintain JHipster's ngFor and tracking -->
        <div class="entity-grid">
          <div *ngFor="let item of items; trackBy: trackId" class="entity-card">
            <!-- Entity content -->
          </div>
        </div>
      </div>
    `
  })
  ```

### 4. Animation Integration
- **Transition Guidelines**:
  ```typescript
  // animations.ts
  export const jhiAnimations = [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger('60ms', [
            animate('200ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ];
  ```

### 5. Modern UI Patterns
- **Loading States**:
  ```html
  <div class="modern-loading-state">
    <div class="loading-indicator">
      <div class="spinner"></div>
      <span>{{ 'global.loading' | translate }}</span>
    </div>
  </div>
  ```

- **Toast Notifications**:
  ```typescript
  // Extend JHipster's alert service
  @Injectable({ providedIn: 'root' })
  export class ModernAlertService extends JhiAlertService {
    showModernToast(message: string, type: string): void {
      // Implement modern toast while maintaining JHipster's alert system
    }
  }
  ```

### 6. Responsive Enhancements
- **Modern Breakpoint System**:
  ```scss
  $modern-breakpoints: (
    'mobile': 480px,
    'tablet': 768px,
    'laptop': 1024px,
    'desktop': 1280px,
    'wide': 1536px
  );

  @mixin respond-to($breakpoint) {
    @media (min-width: map-get($modern-breakpoints, $breakpoint)) {
      @content;
    }
  }
  ```

### 7. Theme Modernization
- **Color System Enhancement**:
  ```scss
  :root {
    // Extend JHipster's color system
    --primary-50: #e3f2fd;
    --primary-100: #bbdefb;
    --primary-500: #2196f3;
    --primary-900: #0d47a1;
    
    // Modern semantic colors
    --surface-background: #ffffff;
    --surface-card: #f8f9fa;
    --surface-border: #e9ecef;
    
    // Modern interaction states
    --state-hover: rgba(0, 0, 0, 0.04);
    --state-selected: rgba(33, 150, 243, 0.08);
    --state-focus: rgba(33, 150, 243, 0.12);
  }
  ```

### 8. Accessibility Modernization
- **Enhanced Focus States**:
  ```scss
  .modern-focus-visible {
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--primary-100);
      border-radius: var(--radius-sm);
    }
  }
  ```

### 9. Performance Optimizations
- **Modern Image Handling**:
  ```html
  <img 
    [src]="imageUrl" 
    [ngSrcset]="imageSrcSet"
    loading="lazy"
    class="modern-image"
    alt="{{ 'entity.image.alt' | translate }}"
  >
  ```

### 10. Integration Rules
- Maintain JHipster's core functionality while enhancing UI
- Use JHipster's translation system for all text
- Preserve entity CRUD operations
- Keep authentication flow intact
- Follow JHipster's security practices
- Maintain compatibility with JHipster's entity generation 