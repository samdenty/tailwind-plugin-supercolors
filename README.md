# `tailwind-plugin-supercolors22`

[![npm version](https://img.shields.io/npm/v/tailwind-plugin-supercolors.svg?style=flat-square)](https://www.npmjs.com/package/tailwind-plugin-supercolors)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-plugin-supercolors.svg?style=flat-square)](https://www.npmjs.com/package/tailwind-plugin-supercolors)
[![Demo](https://img.shields.io/badge/StackBlitz-Demo-blue.svg?style=flat-square)](https://stackblitz.com/~/github.com/samdenty/tailwind-plugin-supercolors?file=index.html)

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

## Runtime

This plugin has an optional runtime to enable a JS video powered brighter range than what is possible with CSS alone.

(Recommended) To enable the runtime, simply import the plugin:

```js
import 'tailwind-plugin-supercolors';
```

Then setup tailwind:

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
    require('tailwind-plugin-supercolors'),
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

You can also make any element brighter by adding the `super` class:

```html
<div class="super">
  <img src="https://placehold.co/500x100">
</div>
```

This could be paired with a `<canvas>` element:

```html
<div class="super">
  <canvas id="my-game"></canvas>
</div>
```
