---
layout: post
title: "Assignment Destructuring in JavaScript"
date: 2023-11-02 14:21 -0700
tags: [programming, javascript]
description: "A quick guide for array and object destructuring in JavaScript"
# series: "Learning JavaScript"
---

In JavaScript, assignment destructuring is a way to assign one or more elements of an existing array or an object (positioned on the right) into one or more variables (positioned on the left).

```javascript
let [a, b] = [1, 2];
console.log(a) // 1
console.log(b) // 2
```

Let's start by focusing on array destructuring. Let's use as an example a simple array containing numbers from 1 to 10.

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Skipping Elements

By adding an empty space between commas, you skip one position in the array.

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, , b] = array // a == 1, b == 3
```

Add more commas to skip more items

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, , , b] = array
// a == 1
// b == 4
```

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, , , , b] = array
// a == 1
// b == 5
```

## Assigning More Elements than Existing Ones

If you assign more elements than the number of elements present in the source, the remaining element are `undefined`.

```js
array = [1, 2, 3, 4, 5];
[a, b, c, d, e, f] = array
console.log(f) // undefined
```

## The Rest Property

To transfer more than one item in an array into a single variable, you can use **the rest property** (`...`). 

The rest property enumerates all of the items in an array and puts them in a separate array.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [...a] = array;
// a == [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
```

You can combine the rest property together with the commas. You can use it to assign individual items from an array.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, b, ...rest] = array
// a == 1
// b == 2
// rest == [3, 4, 5, 6, 7, 8, 9, 10]
```

Commas also allow you to skip items in an array, affecting the items the rest property interacts with.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, , b, ...rest] = array
// a == 1
// b == 3
// rest == [3, 4, 5, 6, 7, 8, 9, 10] 
```

If you want to use the rest property to destructure individual items instead of positioning them in an array, just add square brackets.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[a, b, ...[c, d]] = array
// a == 1
// b == 2
// c == 3
// d == 4
```

You can also use the rest property to access arrays properties, although the properties are from the already modified array, not the original one.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[a, b, ...{ length }] = array
console.log(length) // 8
```

### Position of Rest Property

Remember that the rest property always needs to be at the end of the destructured array.

```javascript
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const [a, ...b , c] = array; //Uncaught SyntaxError: Rest element must be last element
```

If you use the Rest property in a nested way, the first nested property still needs to be the last element of the object.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let [a, b, ...[c, d, , ...[e]]] = array
console.log(a, b, c, d, e) // 1 2 3 4 6
```

## Object Destructuring

So far, we only saw examples of array destructuring in arrays, but you can use assignment destructuring also for objects.

Let's see how assignment destructuring works in JavaScript by looking at this sample object.

```js
const obj = { name: "John", surname: "Smith", age: 25}
```

### Parenthesis Wrapping

When attempting to do object destructuring, you'll notice that a SyntaxError in the browser console:

```js
const obj = {firstName: "John", lastName: "Smith", age: 25};
const {firstName, lastName} = obj; // SyntaxError: Unexpected token '='
console.log(firstName, lastName);
```

To avoid this error, wrap the entire object destructuring assignment in parentheses.

```js
const obj = {firstName: "John", lastName: "Smith", age: 25};
const ({firstName, lastName} = obj); 
console.log(firstName, lastName); // "John Smith"
```

### Key Assignment

If I try to assign the information associated to the keys `name`, `surname`, `age` to variables named in a different way (for example, `a`, `b`, `c`) these variables return undefined as a value.

```js
const obj = { name: "John", surname: "Smith", age: 25}
const ({ a, b, c } = obj)
console.log(a) // undefined
console.log(b) // undefined
console.log(c) // undefined
```

However, if I assign these key values to the variables named after the keys, I get the correct assignment.

```js
const obj = { name: "John", surname: "Smith", age: 25}
const ({ name, surname, age } = obj)
console.log(name) // "John"
console.log(surname) // "Smith"
console.log(age) // 25
```

If I include keys in the object to the left, I can assign key values to variables with different names.

```js
const obj = { name: "John", surname: "Smith", age: 25}
const ({ name: a, surname: b, age: c } = obj)
console.log(a) // "John"
console.log(b) // "Smith"
console.log(c) // 25
```

### Object Destructuring and the Rest Property

You can use the rest property (`...`) also while destructuring an object. The result will be a new object.

```js
const obj = { name: "John", surname: "Smith", age: 25}
const ({ name, ...rest } = obj)
console.log(name) // "John"
console.log(rest) // { surname: 'Smith', age: 25 }
```

The rest property works in the same way even if you use an object with keys on the left.

```js
const obj = { name: "John", surname: "Smith", age: 25}
const ({ name: a, ...rest } = obj)
console.log(a) // "John"
console.log(rest) // { surname: 'Smith', age: 25 }
```

However, when working with an object, you can use the rest property only with one variable.

```js
const obj = { name: "John", surname: "Smith", age: 25}
({name, ...{surname, age} } = obj) // SyntaxError: `...` must be followed by an assignable reference in assignment contexts
```

```js
const obj = { name: "John", surname: "Smith", age: 25}
({name: a, ...{surname: b, age: c} } = obj) // SyntaxError: `...` must be followed by an assignable reference in assignment contexts
```

### Destructuring Nested Objects

To destructure nested objects, remember to replicate the original object structure accurately.

```js
const player = { firstName: "Alessandro", lastName: "Del Piero", teams: { club: "Juventus", national: "Italy" }}
({firstName, lastName, teams: {club, national}} = player)
console.log(firstName, lastName, club, national) // Alessandro Del Piero Juventus Italy
```

### Cannot Destructure Object into Arrays

Since array destructuring uses iteration, you cannot destructure an object (which is non-iterable) into an array (which is iterable).

```js
const obj = { name: "John", surname: "Smith", age: 25}
[d, e, f] = obj // Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```

## Constants and Variables in Assignment Destructuring

In the examples we saw so far, we used only the `const` declaration to destructure assignments. Of course, you can use also `let`, based on your needs.

Moreover, you can also declare specific parts of an array or object in different ways, so that you can fine-tune what you want to keep and what you may want to change later on.

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [a] = array;
let b;
[, b] = array;
console.log(a, b); // 1, 2
b = "two";
console.log(a, b); // 1, "two"
```

## Assignment Patterns

All the previous examples dealt with binding examples, meaning that we are destructuring arrays or objects we already declared. However, we can also assign data to an empty array.

```js
const array = []
const obj = {firstName: "John", lastName: "Smith", age: 25}
({firstName: array[0], lastName: array[1], age: array[2]} = obj)
console.log(array) // [ 'John', 'Smith', 25 ]
```

## Default Values

You can assign default values to destructured properties, which replaces empty or `undefined` items.

```js
const array = [, 2, 3, 4, 5, 6, 7, 8, 9, 10];
[a = 1, ...rest] = array;
console.log(a) // 1
```

```js
const array = [undefined, 2, 3, 4, 5, 6, 7, 8, 9, 10];
[a = 1, ...rest] = array;
console.log(a) // 1
```

If the item is `null`, the default value does not work.

```js
const array = [null, 2, 3, 4, 5, 6, 7, 8, 9, 10];
[a = 1, ...rest] = array;
console.log(a) // null
```

Default values also work in objects.

```js
const obj = { name: "John", surname: "Smith", age: 25}
let { name, surname, age = 18, city = "New York" } = obj
console.log(name, surname, age, city) // John Smith 25 New York
```

## Common Uses of Destructuring Assignments

### Assignment Destructuring and Functions

The returned values of a function can be part of a destructuring assignment.

```js
function helloWorld() {
	return ["Hello", "World"]
}

const [a, b] = helloWorld();
console.log(a, b); // "Hello World"
```

You can use assignment destructuring to get a specific value of an object

```js
const obj = { name: "John", surname: "Smith", age: 25}
function getAge( {age} ) { //this function takes as a parameter the value associated to the key "age" of the provided object
	return age
}

getAge(obj) // 25
```

You can also rename the parameter.

```js
const obj = { name: "John", surname: "Smith", age: 25}
function getAge( {age: years} ) { //this function takes as a parameter the value associated to the key "age" of the provided object
	return years
}

getAge(obj) // 25
```

You can also access nested keys in an object.

```js
const player = { firstName: "Alessandro", lastName: "Del Piero", teams: { club: "Juventus", national: "Italy" }}
function getTeams({lastName, teams: {club, national}}) {
	return `${lastName} played for ${club} and ${national}`
}

getTeams(player) // 'Del Piero played for Juventus and Italy'
```

As usual, you can also assign default values.

```js
const player2 = {lastName: "Ronaldo", teams: { club: "Real Madrid", national: "Portugal" }}
function getTeams({firstName = "Cristiano", lastName, teams: {club, national}}) {
... return `${firstName} ${lastName} played for ${club} and ${national}`
... }
getTeams(player2) // Cristiano Ronaldo played for Real Madrid and Portugal
```

### Swapping Variables

Assignment destructuring is useful for swapping variables.

```js
let a = "Hello";
let b = "World";

[a, b] = [b, a];

console.log(a, b) // "World Hello"
```

Assignment destructuring is also an excellent way to shuffle an array, as explained in [JavaScript.info](https://javascript.info/task/shuffle) (spoilers for exercises!)

```js
export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
```

### Assignment Destructuring and Loops

You can also use assignment destructuring together with `for ... in` loops.

```js
const players = [ 
	player1 = { firstName: "Alessandro", lastName: "Del Piero", teams: { club: "Juventus", national: "Italy" }}, 
	player2 = { firstName: "Cristiano", lastName: "Ronaldo", teams: { club: "Real Madrid", national: "Portugal" }}
];
for (const {lastName: surname, teams: { club: c, national: n }} of players) {
	console.log(`${surname} played for ${c} and ${n}`)
	// Del Piero played for Juventus and Italy
	// Ronaldo played for Real Madrid and Portugal
} 
```

### Combining Arrays and Objects in Assignment Destructuring

You can easily combine array and object destructuring. 

You can destructure objects inside an array...

```js
const players = [ 
	player1 = { firstName: "Alessandro", lastName: "Del Piero", teams: { club: "Juventus", national: "Italy" }}, 
	player2 = { firstName: "Cristiano", lastName: "Ronaldo", teams: { club: "Real Madrid", national: "Portugal" }}
];

[ , {lastName} ] = players // I'm assigning the value associated to the key "lastName" in the second item of the array "players"

console.log(lastName) // Ronaldo
```

...as well as arrays inside objects.

```js
const player = { firstName: "Roberto", lastName: "Baggio", clubs: ["Vicenza", "Fiorentina", "Juventus", "Milan", "Inter", "Bologna", "Brescia"]}

{ clubs: [ , , club, ...rest] } = player

console.log(club, rest) // Juventus [ 'Milan', 'Inter', 'Bologna', 'Brescia' ]
```


