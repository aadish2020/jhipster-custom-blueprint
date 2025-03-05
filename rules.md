# JHipster Modern UI Blueprint - Design Rules and Guidelines

## Core Principles

1. **Component Integrity**
   - Never modify TypeScript components or modules
   - Only modify HTML templates and SCSS/CSS files
   - Maintain all existing component selectors and router outlets
   - Keep all JHipster default functionality intact

2. **Class Naming Convention**
   - Prefix: Use `jh-` prefix for all custom classes
   - Namespace: Use descriptive namespaces for different types of styles
     - `jh-layout-*` for layout components
     - `jh-card-*` for card components
     - `jh-table-*` for table components
     - `jh-form-*` for form components
     - `jh-btn-*` for button components
   - State Classes: Use `is-*` or `has-*` prefix for state
     - Example: `is-active`, `has-error`

3. **Layout Structure**
   - Use consistent container hierarchy:
     ```html
     <div class="jh-layout-container">
       <div class="jh-layout-content">
         <div class="jh-card">
           <!-- content -->
         </div>
       </div>
     </div>
     ```
   - Maintain predictable spacing using CSS variables
   - Use flexbox/grid for responsive layouts

4. **SCSS Organization and Structure**

The SCSS files are organized in a specific structure to maintain clarity and separation of concerns:

```scss
content/scss/
├── _bootstrap.scss.ejs        # Bootstrap configuration and overrides
├── _variables.scss.ejs       # JHipster variables and design tokens
├── global.scss.ejs          # Main entry point
└── components/              # Component-specific styles
    ├── _layout.scss.ejs    # Layout components (navbar, footer, etc.)
    ├── _forms.scss.ejs     # Form styles
    ├── _entities.scss.ejs  # Entity-specific styles
    └── _common.scss.ejs    # Common components (cards, alerts, tables)
```

### File Purposes

1. **_bootstrap.scss.ejs**
   - Bootstrap configuration and customization
   - Theme color definitions
   - Bootstrap feature flags
   - Core Bootstrap imports

2. **_variables.scss.ejs**
   - JHipster design tokens
   - CSS custom properties with `--jh-` prefix
   - Spacing, typography, and color systems
   - Breakpoint definitions

3. **global.scss.ejs**
   - Main entry point
   - Imports all necessary files
   - Base styles
   - Utility classes

4. **components/_layout.scss.ejs**
   - Layout component styles
   - Navbar, footer, containers
   - Page-level components

### Naming Conventions

1. **Variables**
   - Use `--jh-` prefix for all CSS custom properties
   - Example: `--jh-primary`, `--jh-spacing-md`

2. **Components**
   - Use `jh-` prefix for all component classes
   - Example: `jh-navbar`, `jh-card`

3. **States**
   - Use `is-` or `has-` prefix for states
   - Example: `is-active`, `has-error`

### Import Order

```scss
// 1. Bootstrap configuration
@import 'bootstrap';

// 2. Variables and design tokens
@import 'variables';

// 3. Bootstrap framework
@import 'bootstrap/scss/bootstrap';

// 4. Component styles
@import 'components/layout';
@import 'components/forms';
@import 'components/entities';
@import 'components/common';
```

### Best Practices

1. **Variable Usage**
   - Use CSS custom properties for dynamic values
   - Use SCSS variables for static compilation
   - Map Bootstrap variables to custom properties

2. **Component Organization**
   - One component per file
   - Group related components
   - Keep specificity low

3. **Responsive Design**
   - Use Bootstrap's media query mixins
   - Mobile-first approach
   - Consistent breakpoint usage

4. **Performance**
   - Minimize nesting (max 3 levels)
   - Use utility classes for common patterns
   - Avoid redundant styles

5. **CSS Variables**
   ```scss
   :root {
     // Colors
     --jh-primary: #3e8acc;
     --jh-secondary: #172B4d;
     --jh-success: #28a745;
     --jh-danger: #dc3545;
     
     // Spacing
     --jh-spacing-xs: 0.25rem;
     --jh-spacing-sm: 0.5rem;
     --jh-spacing-md: 1rem;
     --jh-spacing-lg: 1.5rem;
     --jh-spacing-xl: 2rem;
     
     // Layout
     --jh-container-padding: var(--jh-spacing-md);
     --jh-card-padding: var(--jh-spacing-lg);
     
     // Typography
     --jh-font-family: system-ui, -apple-system, "Segoe UI", Roboto;
     --jh-font-size-base: 1rem;
   }
   ```

6. **Responsive Design Rules**
   - Use mobile-first approach
   - Define standard breakpoints:
     ```scss
     $jh-breakpoints: (
       sm: 576px,
       md: 768px,
       lg: 992px,
       xl: 1200px
     );
     ```
   - Use consistent media query mixins

7. **Component Patterns**
   - Cards:
     ```html
     <div class="jh-card">
       <div class="jh-card-header">...</div>
       <div class="jh-card-body">...</div>
       <div class="jh-card-footer">...</div>
     </div>
     ```
   - Tables:
     ```html
     <div class="jh-table-container">
       <table class="jh-table">...</table>
       <div class="jh-table-pagination">...</div>
     </div>
     ```
   - Forms:
     ```html
     <div class="jh-form-group">
       <label class="jh-form-label">...</label>
       <input class="jh-form-input">
       <div class="jh-form-error">...</div>
     </div>
     ```

8. **Accessibility Rules**
   - Maintain WCAG 2.1 compliance
   - Use semantic HTML elements
   - Ensure proper color contrast
   - Maintain focus indicators
   - Support keyboard navigation

9. **Performance Guidelines**
   - Minimize CSS specificity
   - Use CSS Grid and Flexbox for layouts
   - Avoid deep nesting in SCSS
   - Optimize for CSS rendering performance

10. **Documentation Requirements**
    - Comment complex SCSS mixins and functions
    - Document custom CSS variables
    - Maintain changelog for visual changes
    - Include examples for reusable patterns

## Implementation Checklist

- [ ] Set up SCSS file structure
- [ ] Define global CSS variables
- [ ] Create basic layout components
- [ ] Implement card styles
- [ ] Design table components
- [ ] Style form elements
- [ ] Create button variations
- [ ] Test responsive layouts
- [ ] Validate accessibility
- [ ] Document all patterns 