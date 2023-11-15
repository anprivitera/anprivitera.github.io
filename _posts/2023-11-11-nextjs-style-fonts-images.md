---
layout: post
title: "Learning NextJS: Getting Started, Style and Static Assets"
date: 2023-11-11 18:24 -0700
tags: [programming, nextjs, web development, learning design]
description: "Learning the basics of NextJS"
series: "Learning NextJS"
mermaid: true
---

Vercel recently released [a new tutorial for NextJS](https://nextjs.org/learn) alongside version 14 of the framework. I decided to take it to familiarize myself with this tool. I just finished Chapter 3, and I'm already captivated by both the strengths of this framework and the excellent learning experience offered by the tutorial.

I thought about sharing my learnings here in a series of posts. I highly recommend taking this tutorial by yourself. However, if you want to have a quick preview of what you'll find, or if you know previous versions of the framework and are interested in taking a quick look to the features of v14, I hope you'll find this post useful!

If you want, you can follow what I'm learning also [by starring the GitHub repository where I'm sharing the tutorial steps](https://github.com/anprivitera/nextjs-dashboard). 

## Creating an App

### How the tutorial does it

The tutorial comes with an already half-completed app. The course designers motivate this choice by saying that it puts the learner in the shoes of a real-life situation, and that's certainly something I would like to see in more tutorials moving forward. Also, similarly to what happens in [Javascript.info](https://javascript.info) the designers managed to insert small, simple yet non-trivial tasks that the learner has to complete to verify their knowledge. I find this method an excellent way to involve the learner in the course, and that's mainly how the tutorial so far has lived up to the expectations it set for itself.

### How you do it in real life

However, if you're installing NextJS from scratch, you'll just have to run this command.


```shell
npx create-next-app
```

On a first install, you'll be able to select several options, including

- The project's name
- Whether you want to use TypeScript (default: yes)
- Whether you want to use ESLint (default: yes)
- Whether you want to use a src (default: no, since `/app/` is now the default)
- Whether you want to use AP router (default: yes)
- Whether you want customize the default import alias (@/*)? (default: no, but if you select yes you can further select which import alias to select).

### Running Development Server

To run the development server locally[^1]

```shell
npm i # installs project's packages
npm run dev
```

## Folder Structure

Here is the folder structure of a NextJS app.

<div class="mermaid">
graph LR;
/ --> app/
/ --> public/
/ --> scripts/
/ --> next.config.js
app/ --> Lib/
app/ --> UI/
app/ --> layout.tsx
app/ --> page.tsx
UI/ --> global.css
UI/ --> *name*.module.css
UI/ --> font.ts
</div>

Here's an explanation of what these files do.

- **`/app/`**: where you spend most time working[^1]
	- **`/app/lib/`**: for functions[^1]
	- **`/app/ui/`**: ui components[^1]
		- **`/app/ui/global.css`**
			- sets the CSS style rules for all the routes in the application when imported in `/app/layout.tsx`
		- **`/app/ui/*name*.module.css`** 
			- example of an individual CSS module, which you can import to a single page.
		- **`/app/ui/font.ts`** 
			- managing application fonts.
	- **`/app/layout.tsx`**
		- exports the whole site for rendering.
- **`/public/`**: for static assets[^1], like images[^2]
- **`/scripts/`**: script to populate database (at least in the NextJS tutorial[^1]).
- **`/next.config.js`**: present already when the app is created for the first time

## Styling

### Styling Solutions

You can use the following styling solutions for your NextJS app.

- Global CSS
- CSS Modules
- Tailwind[^3]
	- When configuring a NextJS app for the first time, you can choose to use Tailwind to manage the app style.[^4]
- SASS[^5]
- CSS-in-JS[^6]

Different styling solutions can coexist at the same time in a NextJS project (or, at least, Global CSS, CSS Modules and Tailwind).[^7]

### Global CSS

If you want to use the same CSS style globally, import `/app/ui/global.css` into `/app/layout.tsx`[^4]

```tsx
import '@/app/ui/global.css'
```

### CSS Modules

NextJS also works with locally scoped CSS modules, which allow for more personalization. In this case, you import modules individually in each page.[^7]

### className Instead of class

Regardless of whether you use Tailwind, vanilla CSS or other methods to style the components, you should use `className` as you do in React, not `class`.

```tsx
<ArrowRightIcon className="w-5 md:w-6" />
```

If you use `class` instead of `className` the page seems to be compiled anyway, but with an error in the npm terminal:

```tsx
<ArrowRightIcon class="w-5 md:w-6" /> //Compiling /page ...
// ✓ Compiled /page in 1320ms (470 modules)
// Warning: Invalid DOM property `class`. Did you mean `className`?
```

### clsx Integration

In NodeJS, you can use clsx to toggle name classes based on conditions.[^8]

## Static Assets Management

The way NextJS optimizes static assets like fonts or images is by downloading them during build time, and hosting them. This way, the browser does not have to make any other network requests.

### Fonts

To use fonts, first import them in the `/app/ui/fonts.ts` file.

```tsx
import { Inter } from 'next/font/google'; // importing Google font already present in the NextJS installation

export const inter = Inter({ subsets: ['latin'], weight: 400}); // exporting the constant inter as the font Inter with subset latin and a weight of 400.
```

Then, to set the same font for the same body, edit `/app/layout.tsx`

```tsx
...
<body className={`${inter.className} antialiased`}>{children}</body>
...
```

The browser console then shows

```html
<body class="__className_2eaf22 antialiased">
```

```css
.__className_e66fe9 {
	font-family: '__Inter_e66fe9', '__Inter_Fallback_e66fe9';
	font-style: normal;
}
```

### Images

Here is how you use the `Image` component in NextJS

```tsx
import Image from 'next/image'; // importing the component.

<Image 
	src="/image.png" // don't forget the initial "/"
	height={} // mandatory
	className="" //optional
	alt="" // accessibility
/>
```

- `className="hidden md:block"` hides a part of the page on mobile and show it on desktop.

- `className="block md:hidden"` hides the part of the page on mobile.

## Unanswered Questions so far

- Can Global CSS, CSS Modules, Tailwind, SASS and CSS-in-JS coexist all at the same time in a NextJS app?
- Can I import personalized fonts in the `/public/` folder for rendering?
- What is exactly a Route?


## Conclusion

And that's it for today! I hope you found this post informative, but of course it is not a replacement for the amazing tutorial Vercel has designed. 

I'll be back soon with more learnings about NextJS!


---

## Footnotes

[^1]: [Getting Started - NextJS Tutorial](https://nextjs.org/learn/dashboard-app/getting-started)
[^2]: [Why optimize images? - NextJS Tutorial](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images#why-optimize-images)
[^3]: [Tailwind CSS - NextJS Docs](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
[^4]: [CSS styling > Tailwind - NextJS Tutorial](https://nextjs.org/learn/dashboard-app/css-styling#tailwind)
[^5]: [Sass - NextJS docs](https://nextjs.org/docs/app/building-your-application/styling/sass)
[^6]: [CSS-in-JS - NextJS docs](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)
[^7]: [CSS Modules - NextJS Tutorial](https://nextjs.org/learn/dashboard-app/css-styling#css-modules)
[^8]: [Using the clsx library - NextJS tutorial](https://nextjs.org/learn/dashboard-app/css-styling#using-the-clsx-library-to-toggle-class-names)