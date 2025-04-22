# Tailwind Plugin Super Colors

A Tailwind CSS plugin that adds a `super-` prefix to all color utility classes.

## Installation

```bash
npm install tailwind-plugin-supercolors
# or
yarn add tailwind-plugin-supercolors
# or
pnpm add tailwind-plugin-supercolors
```

## Usage

### Tailwind v4

Add the plugin to your `styles.css` file:

```css
@import "tailwindcss";
@plugin "tailwind-plugin-supercolors";
```

### Tailwind v3

Add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  plugins: [
    require('tailwind-plugin-superwhite'),
    // ...other plugins
  ],
}
```

## Example

Instead of using:
```html
<div class="bg-red-500 text-blue-700">Hello World</div>
```

You can now use:
```html
<div class="bg-super-red-500 text-super-blue-700">Hello World</div>
```

You can control the strength of the color by adding a number to the end of the class name:
```html
<div class="bg-super-50-red-500 text-super-blue-700">Hello World</div>
<div class="bg-super-25-red-50 text-super-blue-70">Hello World</div>
<div class="bg-super-5-red-100 text-super-blue-700">Hello World</div>
```
