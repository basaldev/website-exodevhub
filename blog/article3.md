---
date: 2019-02-14T17:04:31.645Z
title: Immutable data management in single state applications
banner: /assets/social-immutable.png
medium: >-
  https://medium.com/exodevhub/immutable-data-management-in-single-state-applications-71d1bd84839f
type: post
language: en
languages:
  en: /immutable-data-management-in-single-state-applications
  ja: /イミュータブルなアプリケーションステート管理
category: immutable
shape: circle
author: '"Marty" Shinsuke'
---

In this post, I'm going to explore application state management with immutable data and related JavaScript data types. I will be focusing on the "Reducer" of the popular Redux library which is known for application state management.

## What state management is

Recently, the concept of state management has been taking a significant and essential role in single page application development. Some would say that Redux was the library which sparked the concept in our industry. Many developers would agree, it allows them to create a complicated application in a simple way and makes it easier to see the current status of the application. As a result, our code is easier to debug. Even though it is so powerful; Redux itself is built with really simple concepts.

What simplicity does Redux bring to Javascript applications? I'd like to focus on "Reducer" which is one of the important elements included in Redux. Reducer is the only interface using a pure function to update the state. To update the state, Reducer takes the current state and difference data called Action and generates a new state.

<iframe style="border: none;" width="100%" height="120" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSRSwEBJjin6hEIUu6ejkygUM%2Freducer"></iframe>

What I specifically mention here is that Reducer doesn't update the state directly, but generates a new state. This state generated, is independent of the state before updating. This means that the previous state won't be changed after generating a new state. With that in mind, it enables us to easily trace how the state changes the application has been gone within any given time sequence. Generally, such data that cannot be changed after generation is called **"immutable"**.

<iframe style="border: none;" width="100%" height="270" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FZuYrwj8KzLbycZlQK5TlNU%2Fstate-transition%3Fnode-id%3D0%253A1"></iframe>

## Immutable data in JavaScript

Before moving to the actual topic, I'd like to mention immutable data in JavaScript briefly. Primitive type data such as String, Number and Boolean cannot be changed after creation. On the other hand, Reference type data such as Object and Array can be updated after creation. Those are called **"mutable"**.

<iframe src="https://runkit.com/e?name=a7c21d09-ef38-42b3-997a-6c478547d5fc&base64source=dmFyIGEgPSAxOwp2YXIgYiA9IHsgazogMSB9Owp2YXIgYyA9IFsxXTsKCmEgPSAyOyAvLyB0aGlzIGlzIG5vdCBjaGFuZ2luZyAxIGJ1dCBjcmVhdGluZyAyIG5ld2x5IGFuZCByZS1hc3NpZ25pbmcgdG8gYQpiLmsgPSAyOyAvLyBjYW4gY2hhbmdlIGEgcHJvcGVydHkKYy5wdXNoKDIpOyAvLyBjYW4gYWRkIG5ldyB2YWx1ZQpjb25zb2xlLmxvZyhiKTsKY29uc29sZS5sb2coYyk7&minHeight=231&fixedHeight=371&location=&title=&oembed=true" width="100%" height="270"></iframe>

Looking at the example above, we can see that the object `{ k: 1 }` and the array `[1]` can be changed. You might see that the number assigned to the variable "a", is also changeable, however, this is not changing "1" itself, but creating "2" and re-assigning it to "a" (The value of the variable "a" has overridden by "2").

<iframe src="https://runkit.com/e?name=380ae816-f895-4eda-b2ef-8771d5cf0199&base64source=dmFyIGIgPSB7IGs6IDEgfTsKdmFyIGMgPSBbMV07CgpPYmplY3QuZnJlZXplKGIpOwpPYmplY3QuZnJlZXplKGMpOwoKYi5rID0gMjsgLy8gdGhpcyBkb2Vzbid0IHdvcmsKY1swXSA9IDI7IC8vIHRoaXMgZG9lc24ndCB3b3JrCmNvbnNvbGUubG9nKGIpOwpjb25zb2xlLmxvZyhjKTs%3D&minHeight=252&fixedHeight=392&location=&title=&oembed=true" width="100%" height="270"></iframe>

There is a method to make objects and arrays immutable. That's to use **Object.freeze()**. In the above example, the value of the object and the array are made unchangeable by applying for Object.freeze().

## Immutable variable

New variable definition statements, "const" and "let" are newly added in ES6. By using const to define a variable, we can define a variable that cannot be reassigned. In the example below, you will get an error if you try to reassign a value to the variable b defined by using const. With that, we can prevent unintentional variable reassignment before it happens.

<iframe src="https://runkit.com/e?name=97837f9d-2a67-4c47-8d78-8195abc8d951&base64source=bGV0IGEgPSAxOwphID0gMjsgLy8gWW91IGNhbiBhc3NpZ24gMiB0byBhCgpjb25zdCBiID0gMTsKYiA9IDI7IC8vIFlvdSBjYW5ub3QgYXNzaWduIGEgdmFsdWUgKFRocm93IGFuIGVycm9yKQ%3D%3D&minHeight=147&fixedHeight=287&location=&title=&oembed=true" width="100%" height="190"></iframe>

What we should take care with when defining an object with const is that the properties of the object are still mutable. Const only disables reassignment of a variable and it doesn't make the object immutable. To make an object immutable, we need to apply Object.freeze().

<iframe src="https://runkit.com/e?name=48fda270-07ed-46d2-9d26-3deff321de30&base64source=Y29uc3QgYyA9IHsgazogMSB9OwpjLmsgPSAyOyAvLyBZb3UgY2FuIGNoYW5nZSB0aGUgcHJvcGVydHkKYy5sID0gMzsgLy8gWW91IGFsc28gY2FuIGFkZCBhIG5ldyBwcm9wZXJ0eQpjb25zb2xlLmxvZyhjKTsKCmNvbnN0IGQgPSB7IGs6IDEgfTsKT2JqZWN0LmZyZWV6ZShkKTsKZC5rID0gMjsgLy8gWW91IGNhbm5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5CmQubCA9IDM7IC8vIFlvdSBhbHNvIGNhbm5vdCBhZGQgYSBuZXcgcHJvcGVydHkKY29uc29sZS5sb2coZCk7&minHeight=252&fixedHeight=392&location=&title=&oembed=true" width="100%" height="300"></iframe>

## In a nested structure

I have introduced Object.freeze() as a way to make objects or array immutable. Actually, I need to tell you one thing that you need to care with when dealing with nested structures. Let's see the example below. We can see we are still able to change the value of a nested object even though we apply Object.freeze(), it is only abled to the object, not to the nested structure. This is because Object.freeze() works only for the top level object passed to it. If you want to make the whole values of the nested structure immutable, you have to apply Object.freeze() for each object.

<iframe src="https://runkit.com/e?name=9520673a-40e5-49f1-967d-b7bad34247c4&base64source=Y29uc3QgYSA9IHsgazogeyBsOiAxIH0gfTsKT2JqZWN0LmZyZWV6ZShhKTsKYS5rID0geyBsOiAyIH07IC8vIFlvdSBjYW5ub3QgY2hhbmdlIGl0IGJ1dC4uLgpjb25zb2xlLmxvZyhhLmspOwphLmsubCA9IDI7IC8vIFlvdSBjYW4gY2hhbmdlIHRoZSBjaGlsZCB2YWx1ZSAKY29uc29sZS5sb2coYS5rKTsKCmNvbnN0IGIgPSB7IGs6IHsgbDogMSB9IH07Ck9iamVjdC5mcmVlemUoYik7Ck9iamVjdC5mcmVlemUoYi5rKTsKYS5rLmwgPSAxOyAvLyBZb3UgY2Fubm90IGNoYW5nZSB0aGUgdmFsdWUhIChJdCdzIHN0aWxsIDEpCmNvbnNvbGUubG9nKGEuayk7&minHeight=294&fixedHeight=434&location=&title=&oembed=true" width="100%" height="350"></iframe>

## Immutable application state management with Reducer

Now, let's move onto the main topic, state management. I'm going to dig into the implementation of Reducer which is the important element of Redux mentioned earlier.

<iframe style="border: none;" width="100%" height="120" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FSRSwEBJjin6hEIUu6ejkygUM%2Freducer"></iframe>

As expressed in the above expression, Reducer updates the state by receiving the current state and Action which is the actual changes. In that process, Reducer generates a new independent state not changing the current state. Let's say we have the current state as an object `{ a: 1, b: 1, c: 1 }` and Action as an object `{ b: 2 }`. Reducer generates a new state and set 2 given by Action to 'b' of the new one. Since 'a' and 'c' aren't changed, those values are copied and set to the new one as they are. As a result, object `{ a: 1, b: 2, c: 1 }` is returned as the new one. The update completes by swapping the new one with the current one. Therefore, Reducer enables us to manage our application state in an immutable way by generating a new state every time the state is updated.

<iframe src="https://www.figma.com/embed?embed_host=oembed&url=https://www.figma.com/file/Qw4Fecib4UklKQZR8bKoKq7M/state?node-id=0%3A1" width="100%" height="500"></iframe>


## Reducer implementation example

The example code below is written based on the diagram above. As you can see, Reducer has a very simple structure only generating and returning a new state made with the current state and Action. On the 3rd line, it returns the value to the caller by overriding the new object passed to the first argument of Object.assign() with the order of the current state and the action. Since the state value generated there is stored in a different memory space from where the current state is, we can confirm the difference between the new one and the previous one when we compared them on the 17th line. As you might have already realized on the 15th line, we can still mutate the generated state like `state.a = 2` directly unintentionally, however, those changes will be completely missing when swapping with the next state. Therefore, state updates always have to be done by Reducer.

<iframe src="https://runkit.com/e?name=c6e7e48c-8de6-460d-b103-77c9c65b4d31&base64source=ZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7CiAgLy8gR2VuZXJhdGUgbmV3IHN0YXRlCiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24pOwogIC8vIG9yIHVzZSBzcHJlYWQgb3BlcmF0b3Igb2YgZXM2IGxpa2UgdGhpcwogIC8vIHJldHVybiB7IC4uLnN0YXRlLCBhY3Rpb24gfTsKfQoKLy8gSW5pdGlhbGl6ZSBzdGF0ZQpsZXQgc3RhdGUgPSB7IGE6IDEsIGI6IDEsIGM6IDEgfTsKLy8gQ3JlYXRlIGFjdGlvbgpjb25zdCBhY3Rpb24gPSB7IGI6IDIgfTsKLy8gQ2FjaGUgcHJldmlvdXMgc3RhdGUKY29uc3QgcHJldlN0YXRlID0gc3RhdGU7Ci8vIFVwZGF0ZSBzdGF0ZQpzdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7Cgpjb25zb2xlLmxvZyhzdGF0ZSA9PT0gcHJldlN0YXRlKTsgLy8gZmFsc2UKY29uc29sZS5sb2coc3RhdGUuYik7IC8vIDI%3D&minHeight=420&fixedHeight=560&location=&title=&oembed=true" width="100%" height="450"></iframe>

## Conclusion

I introduced application state management with immutable data and related JavaScript data types while focusing on the state update function, "Reducer" of Redux. In the beginning, I mentioned about the simplicity brought by immutable data. Immutable data is unchangeable data after generated such as Number and String type. Also, it was mentioned that Object and Array type are called mutable. Apart from that, I mentioned that it is possible to make those mutable data unchangeable by applying for Object.freeze(). Finally, I introduced how Reducer actually generates a new state in an immutable with an example.
This time, I intentionally used very simple state data as an example easy to explain, however, actual state would look more complicated like using nesting. I'd like to introduce how to manage such a state by keeping in an immutable in my another post.
