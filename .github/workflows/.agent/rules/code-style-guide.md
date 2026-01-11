---
trigger: always_on
---

# LiquidGlass - Development Rules

## UI & Styling Guidelines
Follow Apples Human Interfact Design Guidelines at https://developer.apple.com/design/human-interface-guidelines/

The goal of this project is to bring Apple Design Components (https://developer.apple.com/design/human-interface-guidelines/components) to the React Web

### Liquid Glass Design System


**Core Philosophy**:
- **Aesthetic**: "Premium iOS 2025" feel. Glassmorphism, translucent backgrounds, vivid blurs, and subtle shadows.
- **Shapes**: High border-radius (pills, rounded cards).
- **Interactions**: "Liquid" feel on hover/active states (scale, brightness changes).
- **Modes**: Support for visual variants (Glass, Flat, Ghost).



### CSS / Emotion
- Use Modular CSS to keep components self contained

## Testing Guidelines

### Strategy
- **Unit/Component Integration**: Use `jest` and `@testing-library/react`.
  - Run via: `npm test`
  - Focus: Render correctness, user interaction simulation, and state updates. Ensure components follow a11y guidelines.
- **End-to-End (E2E)**: Use Playwright.
  - Config: `playwright.config.ts`.
  - Focus: Critical user flows (Login, Bottle creation, Critical path navigation).

### Requirements
- **New Features**: Must include accompanying tests (Unit/Component minimum).
- **Code Coverage**: New code should have 80%+ code coverage added.
- **Bug Fixes**: Should include a regression test ensuring the bug is squashed.

## Coding Standards

### Formatting
- **Indentation**: 4 spaces.
- **Semicolons**: Required.
- **Quotes**: Single quotes preferred for code, double quotes for JSX attributes.

### Best Practices
- **Types**: Strict TypeScript usage. Avoid `any`. Define interfaces in `src/models` or colocated if specific to a component.
- **Imports**: Group imports:
  1. React / External libraries.
  2. Absolute imports (from `src/`).
  3. Relative imports.
  4. Styles / Assets.
- **Components**: Functional Components (`React.FC`) with named exports preferred.

# Avoid and Remove AI code slop
Remove all AI generated slop introduced in this project using workflow /remove-ai-slop