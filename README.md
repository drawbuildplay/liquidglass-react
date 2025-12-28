# Liquid Glass React UI

A modern, highly aesthetically pleasing React UI component library featuring a "Liquid Glass" design system. This library focuses on transparency, blur effects, and depth to create a premium, native-feeling user interface.

## ✨ Design Philosophy

The "Liquid Glass" aesthetic is defined by:
-   **High Blur & Transparency**: Backgrounds use heavy `backdrop-filter: blur(40px)` with `saturate(190%)` for a vibrant, frosted glass look.
-   **Depth**: Multi-layered shadows and subtle white borders create a 3D sense of hierarchy.
-   **Fluidity**: Components like the `Sheet` and `Growl` use smooth, spring-like animations.
-   **Responsiveness**: Layouts adapt intelligently, such as the `Sheet` transforming from a bottom-sheet on mobile to a centered modal on desktop.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm or yarn

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/drawbuildplay/liquidglass-react.git
cd liquidglass-react
npm install
```

### Running the Environment
We use **Storybook** for developing and showcasing components in isolation.

```bash
npm run storybook
```
This will open the Storybook interface at `http://localhost:6006`.

## 🧩 Components

The library includes a suite of reusable "glass" components:

-   **`Showcase`**: A full mobile app simulation demonstrating all components working together.
-   **`Sheet`**: A versatile surface that acts as a bottom-sheet on mobile and a modal on desktop.
-   **`TabBar`**: A floating, glass-effect navigation bar with active state effects.
-   **`Toolbar`**: A sticky header component with support for titles and action buttons.
-   **`PopUpButtonMenu`**: A context menu with glass styling and checkmark support.
-   **`Alert`**: A premium modal dialog for confirmations and warnings.
-   **`Growl`**: A slide-down notification for non-blocking feedback.
-   **`Button`**: Pill-shaped buttons with various variants (Primary, Secondary, Ghost, Destructive).
-   **`Overlay`**: A standard modal backdrop utility.

## 📱 Showcase Demo

Check out the [Live Demo](https://drawbuildplay.github.io/liquidglass-react/?path=/story/examples-showcase--mobile-app-demo) to see the components in action within a simulated iPhone 16 Pro frame.
