---
date: 2019-01-16T09:04:31.645Z
title: 'React Hooks: Making it easier to compose, reuse, and share React code'
banner: /assets/social-hocks.png
type: post
category: react
shape: diamond
medium: https://medium.com/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-328f3bb49b16
authorLink: Tom Bowden
author: Tom Bowden
---

> ⚠️ **Warning**
[React Hooks](https://reactjs.org/docs/hooks-intro.html) are an upcoming feature in React, currently (January 2019) in **alpha** (React v16.7.0-alpha).

Hooks are an upcoming feature in React that enable you to use state and many other React features without writing a class. This has some important ramifications for the future of React code, especially with regard to how components will be composed.

The motivation for hooks, as provided by the [official documentation](https://reactjs.org/docs/hooks-intro.html) from the Facebook React team, is that hooks solve some problems that they have encountered over five years of writing and maintaining React components. These problems are:

1. It’s hard to reuse stateful logic between components
2. Complex components become hard to understand
3. Classes confuse both people and machines

In this short article, we will focus on how React hooks solve the first problem — the difficulty of reusing stateful logic between components — because it has the most wide-ranging consequences.

## Reusing Stateful Logic

For the past few years, the preferred ways of sharing stateful logic in React are higher-order components (HOCs) and render props. Both HOCs and render props require an additional component in the application component tree, and arguably they also make it somewhat more difficult to reason about the shared logic within the code. Now we can add React hooks as a way of sharing logic.

Let’s compare the options for dealing with cross-cutting concerns in React using a very simple example to highlight the differences between them.

## Higher-Order Component

A [higher-order component](https://reactjs.org/docs/higher-order-components.html) (HOC) is a widely-used pattern in React to reuse component logic, by wrapping the component around a target component and passing data to it via its props. In other words, a higher-order component is a function that takes your target component as an argument, and returns a the target component with additional data and functionality.

The following simple example shows a higher-order component that tracks the mouse position in a web app.
```js
function withMousePosition(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
      window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          mousePosition={this.state}
        />
      );
    }
  };
}
```
In the wrapped class component above, the mouse position is obtained via the [mousemove event API](https://developer.mozilla.org/en-US/docs/Web/Events/mousemove) provided by browser windows. We set up an event listener and update the state which holds the mouse position coordinates. The class encapsulates the functionality, and now we can share it with other components.

So, using the higher-order component pattern, the function `withMousePosition` takes any target component as an argument, and returns it with all its existing props plus one additional prop: the `mousePosition` coordinates.
```js
    function App(props) {
      const { x, y } = props.mousePosition;

      return (
        <div className="App">
          <h1>Higher-Order Component Method</h1>
          <h2>Move the mouse around!</h2>
          <p style={{ background: "orange" }}>
            The current mouse position is ({x}, {y})
          </p>
        </div>
      );
    }

    const AppWithMousePosition = withMousePosition(App);
```
In this example we have shared the `mousePosition` coordinate data with a presentational `App` component. The dynamic mouse position is displayed in an orange paragraph:
```js
    <p style={{ background: "orange" }}>
    	The current mouse position is ({x}, {y})
    </p>
```
The wrapped `AppWithMousePosition` component can then be rendered to the `DOM`:
```js
    ReactDOM.render(<AppWithMousePosition />, document.getElementById("root"));
```
Try the HOC approach for yourself in the following [CodeSandbox](https://codesandbox.io/s/43z216n6y9):

[https://codesandbox.io/s/43z216n6y9](https://codesandbox.io/s/43z216n6y9)

## Render Props

A [render prop](https://reactjs.org/docs/render-props.html) is a way of sharing code between React components using a prop whose value is a function. The prop is often called `render`, thus the terminology “render prop”.

Let’s see how our mouse position example introduced earlier looks when implemented using a render prop:
```js
    class MousePosition extends Component {
      constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
      }

      componentDidMount() {
        window.addEventListener("mousemove", this.handleMouseMove);
      }

      componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
      }

      handleMouseMove = event => {
        this.setState({
          x: event.clientX,
          y: event.clientY
        });
      };

      render() {
        return (
          <div
            style={{ height: "100%", width: "100%" }}
            onMouseMove={this.handleMouseMove}
          >
            {this.props.render(this.state)}
          </div>
        );
      }
    }
```
The stateful logic for the mouse position is the same as we used in the higher-order component earlier.

The difference between the HOC method and this render props method is that we now specify a function prop called `render` within the render method of the class component, which takes the state of the component as an argument, and renders it as a child of the class component:
```js
    render() {
    	return (
    		<div
    	    style={{ height: "100%", width: "100%" }}
          onMouseMove={this.handleMouseMove}
        >
          {this.props.render(this.state)}
        </div>
      );
    }
```
Note that the terminology “function as child” is also used when referring to this pattern.

Now, we can wrap any target component with this `MousePosition` component, and dynamically render the mouse position by passing it in via the `render` prop. This is a dynamic way of sharing stateful logic, compared with the statically defined higher-order component.

> As an aside, for more details regarding the pros and cons of higher-order components and render props, please see [this excellent article](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) by Michael Jackson, the co-author of React Router.

Returning to our example, we can now render a presentational `App` component by composing the `MousePosition` component within it. We render the dynamic mouse position within a sky-blue `<p>` element, which is passed via a function in the `render` prop:
```js
    function App() {
      return (
        <div className="App">
          <h1>Render Props Method</h1>
          <h2>Move the mouse around!</h2>
          <MousePosition
            render={mousePosition => (
              <p style={{ background: "skyblue" }}>
                The current mouse position is ({mousePosition.x}, {mousePosition.y})
              </p>
            )}
          />
        </div>
      );
    }
```
To summarize, the behavior associated with listening for `mousemove` events and storing the mouse position coordinates has been encapsulated in the `MousePosition` component, and can be used flexibly in any other component, via this “render props” pattern. This is an example of a composable component that has reusable, shareable state logic.

Try the render props approach for yourself in the following [CodeSandbox](https://codesandbox.io/s/rjprzkj29p):

[https://codesandbox.io/s/rjprzkj29p](https://codesandbox.io/s/rjprzkj29p)

## React Hooks

Now, let’s look at how “hooks” could be used to achieve the goal of reusing stateful logic within your apps, using the very same mouse position example:
```js
    function useMousePosition() {
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

      function handleMouseMove(event) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      }

      useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, []);

      return mousePosition;
    }
```
Note that we have created a “[custom hook](https://reactjs.org/docs/hooks-custom.html)” here called `useMousePosition`. It is a function component, not a class component, but it does encapsulate state!

For our mouse position example, we are using two different React hooks within the body of our custom hook function:

- [State hook](https://reactjs.org/docs/hooks-state.html): `useState`
- [Effect hook](https://reactjs.org/docs/hooks-effect.html): `useEffect`

The `useState` hook lets us add React state to function components, without having to convert them into class components. The `useState` function hook takes the initial value of state as an argument, and returns a two-element array containing the state value (`mousePosition`), and a function to update that value (`setMousePosition`). You can see at the bottom of the function that we are returning the `mousePosition` state value from the function.

The `useEffect` hook lets you perform side effects in function components. Examples of side effects are getting data from an API, listening for browser events, and manually changing the DOM. The `useEffect` hook carries out the same tasks as the lifecycle methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined do in class components.

`useEffect` takes a callback function (called the “effect”) as its first argument, and runs it after each render of the component. In our example, the effect is to set up the `mousemove` event listener after the first render when the component is mounted. The returned callback from the effect, if specified, serves to “clean up” before the component is unmounted. In our example, we are removing the event listener when we unmount.
```js
    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
```
Within the effect callback, we are setting up a `mousemove` event listener called `handleMouseMove`, which itself calls `setMousePosition` with the updated mouse coordinates whenever the user moves the mouse.

The second argument to the `useEffect` function hook, if specified, is an **array of specific state values** that the effect will run on whenever the value updates. That is, the effect will run on each re-render of the component triggered by updates to those specific state values. If **no array** is specified, then the default behavior is to re-render the component and fire the effect whenever any of the state values updates.

In our example, we are passing an **empty array** `[]`, which means that the effect does not depend on any state value updating in our component, i.e. our effect only runs on mount and it will clean up on unmount, but it won’t run on any `mousePosition` updates. The event listener already updates the `mousePosition`, so it is unnecessary to re-render the component when that happens.

Our `useMousePosition` custom hook completely replicates the behavior of the class components used in the HOC and render-props patterns earlier. It fully encapsulates the behavior we need in a **very compact**, **easy-to-understand**, and **reusable** way.

Now, we can share this dynamic mouse position functionality in any other component. Let’s call our custom hook `useMousePosition` in our presentational `App` component:
```js
    function App() {
      const { x, y } = useMousePosition();

      return (
        <div className="App">
          <h1>React Hook Method</h1>
          <h2>Move the mouse around!</h2>
          <p style={{ background: "palegreen" }}>
            The current mouse position is ({x}, {y})
          </p>
        </div>
      );
    }
```
Here, we are rendering the dynamic mouse coordinates in a pale green `<p>` tag.

Try the hooks approach for yourself in a [CodeSandbox](https://codesandbox.io/s/548z479m0n):

<iframe src="https://codesandbox.io/embed/548z479m0n" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Summary

Now you’ve seen the same mouse position example implemented in three different ways: **higher-order components**, **render props**, and **hooks**.

It is clear that by far and away **the most elegant** and **easy to follow** code is found in the React hook approach. In addition, **less code** is needed to achieve **the same results**.

Hooks make it easier than ever to separate out stateful component logic, data, and functionality into an encapsulated structure, making it convenient to reuse and share. The implications of this should not be underestimated. This is a **huge and exciting** development for React and everyone who uses it!
