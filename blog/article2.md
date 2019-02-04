---
date: 2019-01-30T09:04:31.645Z
title: 'Web Components: Understanding Attributes and Properties'
banner: /assets/social-lit-elements.png
category: web-components
shape: corner
author: Alex King
---

When working with component libraries there is a blending of Javascript Properties and HTML Attributes that can make it confusing to understand what they really are and how they work. This can be a problem later on so here is a breakdown.

**HTML elements have attributes.** Theses are strings that can be passed into an HTML Tag.
```html
    <img src="https://picsum.photos/200/300" />
```
This is because a HTML Document is only a string until it is coupled with a DOM.

*The Document Object Model (DOM) represents that same document ... The DOM is an object-oriented representation of the web page, which can be modified with a scripting language such as JavaScript. - MDN*

When you request a tag using Javascript, it will return an `Element` Object from the DOM; with this Javascript object, you can change the *attributes* of the HTML element but you can also set properties of the object itself which don't have visible representation in the document.

Properties can be complex data like arrays, functions or other objects; This is especially useful when storing data related to a node.

*Try it yourself in your browser console.*

```js
$0 //will return the selected element in chrome/firefox/safari
$0.coolBeans = ['baked', 'black', 'refried'];
$0.coolBeans; // return a real array, not a string ['baked', 'black', 'refried']
```

Now lets do the same with attributes

```js
$0 //will return the selected element in chrome/firefox/safari
$0.setAttribute('coolBeans', ['baked', 'black', 'refried']);
$0.coolBeans; // return undefined
$0.getAttribute('coolBeans'); // return a string "baked,black,refried"
```

Things get a little more complex when you start using a property that is already defined as an attribute for that tag.

```js
const imgTag = document.createElement('img'); //non rendered img tag
imgTag.srcset = ['https://picsum.photos/320/320 320w',
								 'https://picsum.photos/480/320 480w'
								 'https://picsum.photos/640/320 640w']
// this is going to return a real array right?
// nope
imgTag.srcset; //"https://picsum.photos/320/320 320w,https://picsum.photos/480/320 480w,https://picsum.photos/640/320 640w"
```

This Image Element's Class has a property handlers for `srcset` which ***reflect*** it has attributes and set the property as well.

For the most part this isn't a problem but it's helpful to understand this relationship because it will help you build better more reusable Web Components.

We will be using the library Lit Element from Google in this Article. [Lit Element](https://lit-element.polymer-project.org) includes a nice base structure and lets you create HTML structure for your component using template literals.

Below is a basic example.

```js
class BeanList extends LitElement {
  constructor() {
    super();
  }
  render() {
    return html`
	   <ul>
			<li>Baked<li>
			<li>Black</li>
		  <li>Refried</li>
		 </ul>
    `
  }
}
customElements.define('cool-beans', BeanList);
// You can now add <cool-beans></cool-beans> to your html
```

This will now render a beautiful list of cool beans, but it's a static string so let's move them to an array.

```js
class BeanList extends LitElement {
  constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

Now we have set the `.list`  of the object, we can access this data using Javascript.

```js
$0 //will return the selected element in chrome/firefox/safari
$0.list // its return a real array ['Baked','Black','Refried']
$0.list = ['Baked','Black','Refried','Pino'];
$0.list // ['Baked','Black','Refried','Pino']

const x = document.createElement('cool-beans');
x.list = ['Baked','Black','Refried','Pino'];
document.body.appendChild(x);
// This WILL render the <li>Pino</li> because the list was updated before
// it rendered the tag
```

But you will notice the HTML doesn't update. The Object property is not connected to the Render cycle and it won't re-render if this property is changed. So let's make it listen to our new list.

```js
class BeanList extends LitElement {
  constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
	static get properties() {
    return {
      list
    };
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

Now we have added a property listener, when this property is updated, it will re-render.

```js
$0 //will return the selected element in chrome/firefox/safari
$0.list // its return a real array ['Baked','Black','Refried']
$0.list = ['Baked','Black','Refried','Pino'];
$0.list // It will re-render and you still have
			  // a real ['Baked','Black','Refried','Pino']
```

So now our example from before works perfectly.  Now the final piece of the puzzle is connecting out properties to our attributes.

```js
class BeanList extends LitElement {
	constructor() {
    super();
    this.list = [
			'Baked',
			'Black',
			'Refried'
		]
  }
  static get properties() {
   return {
      list: {
      reflect: true,
      type: {
        fromAttribute: x => x.split(','),
        toAttribute: x => x.join(),
      }
    },
   }
  }
  render() {
    return html`
      <ul>
        ${this.list.map((beanName)=> { return html`<li>${beanName}</li>`})}
      </ul>
		`
  }
}
```

Hooray with this above example, you can now do both!

```js
$0 //will return the selected element in chrome/firefox/safari
$0.setAttribute('list', ['Baked','Black','Refried','Pino'];);
$0.list = ['Baked','Black','Refried','Pino'];
```

Both statements will update the Attributes, Property and HTML of the component.

`fromAttribute`  and `toAttribute` are very powerful interfaces to have but `lit-element` comes with some pre-made converters like `Array` the full list can be [found here](https://lit-element.polymer-project.org/guide/properties#conversion-type).

If you want to use more complex structures, you are unlikely to reflect those as attributes so you don't need the converters.

```js
class BeanList extends LitElement {
  static get properties() {
   return {
      list: { attribute: false },
   }
  }
  constructor() {
    super();
    this.list = [];
  }
  render() {
    return html`
      <ul>
        ${this.list.map((bean)=> { return html`<li><caption><img src="${bean.img}" />${bean.name}</caption></li>`})}
      </ul>
		`
  }
}
customElements.define('cool-beans', BeanList);
```

In the above example you, no attribute is created on the element only properties and you a set them using a range of framework including native HTML. Have a play.
<!-- <iframe width="100%" height="600" src="https://glitch.com/embed/#!/embed/article-example-attributes?path=src/index.ts&previewSize=33" frameborder="0" allowfullscreen></iframe> -->

One Caveat is that some frameworks don't pass properties correctly to Web Components yet. A  list of compatible frameworks can be [found here](https://custom-elements-everywhere.com/)
