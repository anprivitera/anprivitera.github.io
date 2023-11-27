---
layout: post
title: "Creating Wikipedia-style external links in Obsidian with Templater"
date: 2023-11-26 17:35 -0700
tags: [obsidian, templater, javascript, pkms]
description: 
series:
published: true
mermaid: false
---

When I write a personal note in my [Obsidian](https://obsidian.md/) vault, I like to include an external links section at the bottom of the note. My inspiration for this format was, obviously, [Wikipedia](https://en.wikipedia.org/). I really like the format of links at the bottom of Wikipedia pages, which includes both the external link and a wikilink to the larger site/service that hosts the page. 

![A screenshot of external links on Wikipedia](/assets/images/wikipedia-external-links.png)

It makes sense to the way I organize notes, because it allows me to track which services, people or organizations are part of a certain social media.

![A screenshot of external links in my vault](/assets/images/wikipedia-style-links.png)

There is only one issue with this solution: it takes quite a lot of time to type the external links and then the internal link. To make the process quicker, I wrote this script, which I then activate in my Obsidian vault using [Templater](https://github.com/SilentVoid13/Templater).

```js
<%* // Templater syntax
async function links() {
	let linkOutput, siteTitle, siteUrl, siteOrSocial;
	const noteTitle = tp.file.title; // Templater API
	const clipboard = tp.system.clipboard; // Templater API
	const suggester = tp.system.suggester; // Templater API
	const prompt = tp.system.prompt; // Templater API

	siteUrl = await prompt("What is the link's url?", clipboard);
	siteTitle = await prompt("What is the name of the site?");
	let options = [{ title: "Single Site", formElement: `[${siteTitle}](${siteUrl})`}, {title: "Page on Site", formElement: `[${noteTitle}](${siteUrl}) on [[${siteTitle}]]`}];
	linkOutput = await suggester(options.map((x) => x.title), options.map((x) => x.formElement), true, "Is this a link for a single site or for a page in a bigger site?");
	return linkOutput;
}
let string = await links();
%> // Templater syntax
- <%* tR += string %> // Templater syntax
```

Here is the script in action.

![A recording of the script in action](</assets/images/wikipedia links example.gif>)

Feel free to grab this script and use it for your own vault!





