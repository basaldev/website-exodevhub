---
date: 2019-03-04T09:00:00.000Z
title: 'React in a Serverless World'
banner: /assets/social-serverless-world.png
type: post
category: react
shape: square
language: en
medium: https://medium.com/@tombowden_8885/react-in-a-serverless-world-c54596eb148
author: Tom Bowden
---

### “A comparison between client-server and serverless full-stack app architectures”

> The intended audience for this article is primarily front-end developers. This article assumes the reader is familiar with [React](https://reactjs.org/) and some basic [GraphQL](https://graphql.org/). In addition, the client-side app in this article uses recently introduced React [hooks](https://reactjs.org/docs/hooks-intro.html). Backend technologies will be explained in some detail, so no detailed understanding of topics such as [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), deployments, [AWS](https://aws.amazon.com/), [Amplify](https://aws-amplify.github.io/), and [AppSync](https://aws.amazon.com/appsync/) is necessary to follow along. Full repos are available with the app examples.

This article serves to illustrate the differences between client-server and serverless approaches to building full-stack apps, with React being used for the UI. As a starting point, we will build a simple client side app in React, used for both client-server (which will call “serverful” from now on, taking a lead from this illuminating [technical report](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2019/EECS-2019-3.pdf) by UC Berkeley) and serverless approaches. Now, the [TodoMVC project](http://todomvc.com/) is a well-known initiative that uses a Todo app to compare web frameworks, so we’ll go with a Todo app based on it. Specifically, we’ll select the [Todo MVC app](https://github.com/reduxjs/redux/tree/master/examples/todomvc) from the Redux repository, use their CSS styling, remove some functionality to make it simpler for this article, and switch out class-based components for functional components using React hooks, to further simplify the code.

---

## Starting Point: Client Side App

You can see the client side app that resulted from doing this in the following [CodeSandBox](https://codesandbox.io/s/3r6jjoljpp):

<iframe src="https://codesandbox.io/embed/3r6jjoljpp" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

This Todo app is a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) app, where the user can:

- add todos by typing them into the text input area and hitting the enter key
- update todos by double-clicking a todo in the list
- delete todos by hovering over a todo and clicking the `×` icon
- mark todos as `completed` by clicking in the circular icon to the left of the todo

For the purposes of this simple example app, some example todos were added in a `data` folder as an array of todo objects. The app state data is held in memory, and is not persisted across browser refreshes.

Now we have a simple client-side app starting point, there are basically two separate approaches to add data persistence for users:

- **serverful (client-server) architecture**, where the developer selects and deploys a backend server and a persistent data source (database)
- **serverless architecture**, where the backend server and data source implementations are outsourced to a [BaaS](https://en.wikipedia.org/wiki/Mobile_backend_as_a_service) cloud provider

We will create two full-stack solutions based on the client-only app — one for each architectural approach — explaining the process for each in detail, so that we can evaluate the pros and cons of each approach. In addition, we have chosen to only use packages written in JavaScript for both the client and the server, in the interest of simplicity.

---

## Approach A: Serverful Architecture

> The complete repos for this example can be found in the Github repos for the [server](https://github.com/bowdentom/todo-server-app) and the [client](https://github.com/bowdentom/todo-client-app).

We will use a GraphQL API for our examples, even though a simple REST API would be more than sufficient for a simple Todo app. The reason for this is that GraphQL has many advantages over REST when additional features are incrementally added to a project, so it is an “aspirational” choice.

For our backend, we will use [Apollo Server (v2)](https://www.apollographql.com/docs/apollo-server/), a community-maintained open-source GraphQL server, which works with many [Node.js](https://nodejs.org/en/) HTTP server frameworks. We will work with it as a [standalone](https://github.com/apollographql/apollo-server#installation-standalone) package, without integrating it with another web framework. We’ll deploy the server to Heroku later.

For our persistent data source, we will use [MongoDB](https://www.mongodb.com/), a no-SQL database. Instead of using a native NodeJS driver for MondoDB, we will use Mongoose, which is an ORM for MongoDB, for simplicity. We’ll deploy the MongoDB database to [MongoDB Atlas](https://cloud.mongodb.com).

For handling GraphQL requests on the front-end, we will use [Apollo Client](https://www.apollographql.com/docs/react/essentials/get-started.html). Since we are using React hooks, we will _not_ use `react-apollo` React components that use the _render prop pattern_, for reasons that we explain in [this article](https://www.exodevhub.com/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code). We’ll deploy the client app to Heroku as well, as a separate app to the server app.

Let’s look at the backend code first.

### Step 1 (Server): Create the GraphQL server and connect the database

The server app’s base level [`index.js`](https://github.com/bowdentom/todo-server-app/blob/master/src/index.js) file does the following:

1. Sets up the MongoDB database connection (via Mongoose)
2. Gets the parsed GraphQL schema type definitions and resolvers
3. Creates and runs the Apollo GraphQL server

```js
const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const mongoose = require('mongoose')

// Database connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const database = mongoose.connection
database.on('error', console.error.bind(console, 'connection error:'))
database.once('open', () => console.log('We are connected to MongoDB'))

// GraphQL schema types and resolvers
const typeDefs = gql(
  fs.readFileSync(`${__dirname}/graphql/schema.graphql`, { encoding: 'utf-8' })
)
const resolvers = require('./graphql/resolvers')

// Apollo GraphQL server
const server = new ApolloServer({ typeDefs, resolvers })
server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`GraphQL server ready on ${url}`))
```

### Step 2 (Server): Create the GraphQL schema

A GraphQL schema describes the functionality available to the clients which connect to it. A core building block of a GraphQL schema are the type definitions. Types provide a wide range of functions:

1. Define the shape of the data and the data types used
2. Show the relationships between different types
3. Define which data-fetching (querying) and data-manipulating (mutating) operations can be executed by the client
4. Provide documentation for the client user (via [introspection](https://graphql.org/learn/introspection/))

Two types within the schema are special: the `Query` and `Mutation` types. These are special because they define the _entry point_ of every GraphQL query. The GraphQL schema describes how to get data from every point in the data graph by traversing it from one point (or “node”) to another, starting at the schema entry points. Our schema has one `Query` entry point: `listTodos`, an operation that yields an array of all of the todos held in the data source. There are four `Mutation` fields which are entry points — `createTodo`, `deleteTodo`, `updateTodo`, and `toggleCompletion` — which describe all the data manipulation operations that the client can do.

The input types describe the shape and data types required when the client wants to mutate data. In our schema, we define three input types: `CreateTodoInput`, `UpdateTodoInput`, and `DeleteTodoInput`.

Scalar types are simple tyes such as `String`, `Boolean`, and `ID`. User-defined types are made up of scalar types, such as our `Todo` type, which specifies a todo object requiring an `id` of type `ID`, some `text` of type `String`, and a `completed` flag of type `Boolean`. Square brackets around a type indicate an array, so `[Todo]` is an array of todos. The exclamation mark `!` after a type indicates that it is non-null.

Here is our entire schema, in the [`src/graphql/schema.graphql`](https://github.com/bowdentom/todo-server-app/blob/master/src/graphql/schema.graphql) file:

```js
type Todo {
  id: ID!
  text: String!
  completed: Boolean!
}

input CreateTodoInput {
  id: ID
  text: String!
  completed: Boolean!
}

input UpdateTodoInput {
  id: ID!
  text: String
  completed: Boolean
}

input DeleteTodoInput {
  id: ID
}

type Query {
  listTodos: [Todo]
}

type Mutation {
  createTodo(input: CreateTodoInput!): Todo
  deleteTodo(input: DeleteTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  toggleCompletion(input: UpdateTodoInput!): Todo
}
```

### Step 3 (Server): Create the GraphQL resolvers

Let’s have a look at our resolvers, in the [`src/graphql/resolvers.js`](https://github.com/bowdentom/todo-server-app/blob/master/src/graphql/resolvers.js) file, which are very simple:

```js
const db = require('../dataSource/db')

const Query = {
  listTodos: () => db.list(),
}

const Mutation = {
  createTodo: (_, args) => db.create(args.input),
  deleteTodo: (_, args) => db.remove(args.input),
  updateTodo: (_, args) => db.update(args.input),
  toggleCompletion: (_, args) => db.toggle(args.input),
}

module.exports = { Query, Mutation }
```

You can think of each field in a GraphQL query as a function or method of the previous type which returns the next type. For example, as described in the GraqhQL schema, the `createTodo` field in the root `Mutation` type is a function that takes an input object and returns a `Todo`. Each field on each type is backed by a function called a _resolver_, which we explicitly specify. When a field is executed, the corresponding resolver is called to produce the next value. In our example, the `createTodo` resolver returns a value of type `Todo` (as specified by our GraphQL schema), by calling a function `create` in our data source interaction module `db` (managed by the Mongoose ORM, which will we describe in more detail soon).

Each resolver function receives four arguments (the previous `obj`, the arguments provided to the field `args`, the contextual information `context`, and field-specific information `info`). You can find [more details here](https://graphql.org/learn/execution/#root-fields-resolvers). We pass an `input` object via the mutation resolver to the Mongoose ORM via the `args` function argument, which will — as we will see later — return a new todo object of type `Todo`.

If a field produces a scalar value like a string or number, then the execution completes. However if a field produces an object value then the query will contain another selection of fields which apply to that object. This continues until scalar values are reached. GraphQL queries always end at scalar values.

In our example, the returned `Todo` is an object value, which contains only scalar fields (`id`, `text`, and `completed`). Resolving these is [trivial](https://graphql.org/learn/execution/#trivial-resolvers), and the Apollo server lets us omit resolvers this simple. It will assume that if a resolver is not provided for a field, then a property of the same name should be read and returned.

### Step 4 (Server): Interact with the data source (part 1, Mongoose model)

Let’s start off with the code, found in the [`src/dataSource/model.js`](https://github.com/bowdentom/todo-server-app/blob/master/src/dataSource/model.js) file:

```js
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = { Todo }
```

MongoDB databases comprise of `collections`, which resemble JavaScript arrays, holding our data `documents`, which resemble JavaScript objects. Mongoose defines [schemas](https://mongoosejs.com/docs/guide.html) (not to be confused with GraphQL schemas), each of which maps to a MongoDB collection and defines the shape of documents within that collection.

Our Mongoose schema simply describes the shape of a our Todo documents, which have `id`, `text`, and `completed` keys, and the types and additional properties (such as `required`, `default`, and `minLength`) on them.

To use the Mongoose schema, we convert it into a Mongoose [model](https://mongoosejs.com/docs/models.html) we can work with: `const Todo = mongoose.model('Todo', todoSchema)`. Instances of these `Todo` models are documents, that map to the MongoDB documents.

### Step 5 (Server): Interact with the data source (part 2, Mongoose CRUD operations)

The operations to create, read, update, and delete documents in our MongoDB database are coded up in [`src/dataSource/db.js`](https://github.com/bowdentom/todo-server-app/blob/master/src/dataSource/db.js):

```js
const mongoose = require('mongoose')

const { Todo } = require('./model')

const list = async () => {
  try {
    const todos = await Todo.find()
    if (!todos) return []
    return todos
  } catch (err) {
    console.log(`Error in list todos: ${err}`)
  }
}

const create = async input => {
  const newTodo = new Todo({
    id: input.id,
    text: input.text,
    completed: input.completed,
  })
  try {
    await newTodo.save()
    return newTodo
  } catch (err) {
    console.log(`Error in create todo with text ${input.text}: ${err}`)
  }
}

const remove = async input => {
  try {
    if (!input.id) return
    const removedTodo = await Todo.findOneAndDelete({ id: input.id })
    return removedTodo
  } catch (err) {
    console.log(`Error in remove todo with id ${input.id}: ${err}`)
  }
}

const update = async input => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: input.id },
      { text: input.text, completed: input.completed },
      { new: true }
    )
    return updatedTodo
  } catch (err) {
    console.log(
      `Error in update todo with id ${input.id} and text ${input.text}: ${err}`
    )
  }
}

const toggle = async input => {
  try {
    // 1. Find todo that needs to be toggled in database
    const toggleTodo = await Todo.findOne({ id: input.id })
    // 2. Update the completed flag of that todo in the database
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: toggleTodo.id },
      { text: toggleTodo.text, completed: !toggleTodo.completed },
      { new: true }
    )
    return updatedTodo
  } catch (err) {
    console.log(`Error in toggle with id ${input.id}: ${err}`)
  }
}

module.exports = { list, create, remove, update, toggle }
```

All database operations are asynchronous, so we are using the [`async/await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) syntax to deal with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

This file describes five asynchronous functions: `list`, `create`, `remove`, `update`, and `toggle`, which use several of Mongoose’s CRUD helper utilities. Let’s describe how each function works:

1. `list`: to get all documents in a collection, we use the [`Model.find()`](https://mongoosejs.com/docs/api.html#model_Model.find) method.

2. `create`: requires an input object be passed to a newly created document, when is then saved to the database with the [`Document.prototype.save()`](https://mongoosejs.com/docs/api.html#document_Document-save) method.

3. `remove`: takes the `id` field from the input object, and is used with the [`Model.findOneAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete) method.

4. `update`: is used with the [`Model.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) method. This method finds a matching document based on the conditions in the first argument, updates the document based on the second argument, and if `{new: true}` is added in the optional third argument, then the modified document is returned (rather than the original document, which is the default behavior).

5. `toggle`: also updates a document in the database. First, we need to find the todo for which we want to toggle the `completed` boolean. For this, we use the [`Model.findOne()`](https://mongoosejs.com/docs/api.html#model_Model.findOne) method. Then we update it.

> With that, we have completed all the code in `src` of the server side of our serverful app. You can find the project in the [`todo-server-app`](https://github.com/bowdentom/todo-server-app) on Github.

### Step 6 (Client): Creating the Apollo Client

Now that we have the GraphQL server app, we can work on the GraphQL client app. To make GraphQL requests from the client, we will make use of Apollo Client. The simplest way to get started with Apollo Client is by using the [Apollo Boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) package.

Let’s start with the client-only React app that we showed earlier in the [CodeSandBox](https://codesandbox.io/s/3r6jjoljpp). The code can be cloned from a Github repo that we have prepared.

#### Preparation: Clone `todo-clientonly` App

In your terminal’s command-line:

```
git clone https://github.com/bowdentom/todo-clientonly.git todo-client-app
cd todo-client-app
```

The [`App`](https://github.com/bowdentom/todo-clientonly/blob/master/src/components/App.js) component is where we will be making most code changes to adapt it for our GraphQL client app.

```js
import React, { useState } from 'react'
import { generate } from 'shortid'

import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
import { initialTodos } from '../data'

const App = () => {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = todoText => {
    const addedTodo = {
      id: generate(),
      completed: false,
      text: todoText,
    }
    const updateTodos = [...todos, addedTodo]
    setTodos(updateTodos)
  }

  const removeTodo = todoId => {
    const updateTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updateTodos)
  }

  const editTodo = (todoId, todoText) => {
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.text = todoText
    setTodos(updateTodos)
  }

  const completeTodo = todoId => {
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.completed = !editedTodo.completed
    setTodos(updateTodos)
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) addTodo(text)
          }}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
```

Instead of getting hard-coded `initialTodos`, we will now get them via a GraphQL request query. We will call the query `ListTodos`. You will find it in the completed [`todo-client-app`](https://github.com/bowdentom/todo-client-app) on Github in the file [`src/graphql/queries`](https://github.com/bowdentom/todo-client-app/blob/master/src/graphql/queries.js):

```js
import gql from 'graphql-tag'

export const LIST_TODOS = gql`
  query ListTodos {
    listTodos {
      id
      text
      completed
    }
  }
`
```

The `ListTodos` query string is wrapped in a `gql` template tag to parse it into GraphQL [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (from the [`graphql-tag`](https://github.com/apollographql/graphql-tag) package).

Now, we will need the AST of the mutations as well. You can find them in file [`src/graphql/mutations`](https://github.com/bowdentom/todo-client-app/blob/master/src/graphql/mutations.js):

```js
import gql from 'graphql-tag'

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      text
      completed
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      text
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      text
      completed
    }
  }
`
```

Now that we have these GraphQL ASTs, we can turn back to our `App` component, set up the Apollo Client, add a `fetchTodos` function to be run the `ListTodos` query when the component mounts, and implement the `CreateTodo`, `DeleteTodo`, and `UpdateTodo` mutations in the existing handlers for `addTodo`, `removeTodo`, `editTodo`, and `completeTodo`:

```js
import React, { useState, useEffect } from 'react'
import { generate } from 'shortid'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
import { LIST_TODOS } from '../graphql/queries'
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from '../graphql/mutations'

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : process.env.REACT_APP_API_URL

const client = new ApolloClient({
  link: new HttpLink({ uri: apiUrl }),
  cache: new InMemoryCache(),
})

const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    // Get a fresh list of all todos from the server
    try {
      const response = await client.query({
        query: LIST_TODOS,
        fetchPolicy: 'no-cache',
      })
      const fetchedTodos = response.data.listTodos
      setTodos(fetchedTodos)
    } catch (err) {
      console.log(`Error in fetchTodos API call: ${err}`)
    }
  }

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async todoText => {
    // Update UI immediately
    const addedTodo = {
      id: generate(),
      text: todoText,
      completed: false,
    }
    const updatedTodos = [...todos, addedTodo]
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const createTodoInput = {
        id: addedTodo.id,
        text: addedTodo.text,
        completed: addedTodo.completed,
      }
      await client.mutate({
        mutation: CREATE_TODO,
        variables: { input: createTodoInput },
      })
    } catch (err) {
      console.log(`Error in addTodo API call with text ${todoText}: ${err}`)
    }
  }

  const removeTodo = async todoId => {
    // Update UI immediately
    const updatedTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const deleteTodoInput = {
        id: todoId,
      }
      await client.mutate({
        mutation: DELETE_TODO,
        variables: { input: deleteTodoInput },
      })
    } catch (err) {
      console.log(`Error in removeTodo API call with id ${todoId}: ${err}`)
    }
  }

  const editTodo = async (todoId, todoText) => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.text = todoText
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: todoText,
        completed: editedTodo.completed,
      }
      await client.mutate({
        mutation: UPDATE_TODO,
        variables: { input: updateTodoInput },
      })
    } catch (err) {
      console.log(
        `Error in editTodo API call with id ${todoId} and text ${todoText}: ${err}`
      )
    }
  }

  const completeTodo = async todoId => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.completed = !editedTodo.completed
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: editedTodo.text,
        completed: editedTodo.completed,
      }
      await client.mutate({
        mutation: UPDATE_TODO,
        variables: { input: updateTodoInput },
      })
    } catch (err) {
      console.log(`Error in completeTodo API call with id ${todoId}: ${err}`)
    }
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) addTodo(text)
          }}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
```

Note that we follow the pattern of updating the UI immediately in the handlers, and then making the asynchronous GraphQL requests to the server.

> With that, we have completed all the code in `src` of the client side of our serverful app. You can find the project in the [`todo-client-app`](https://github.com/bowdentom/todo-client-app) on Github.

We can now move on to deploying the database, the server, and the client.

### Step 6: Deploying the database

We will use [Cloud Atlas](https://www.mongodb.com/cloud/atlas) as the cloud-hosting service of our MongoDB database. We will be using their [free tier](https://docs.mongodb.com/manual/tutorial/atlas-free-tier-setup/).

- _Create an Atlas user account_. Click the `Start free` button and create an account.
- _Create a new cluster_. First, select a Cloud Provider & Region. For example, `AWS N. Virginia (us-east-1)`. Then, select Cluster Tier. Select`M0`. The specify a Cluster Name. For example: `todo-db`. Then click the `Create Cluster` button at the bottom. It will take a few minutes for the cluster to be created.
- _Add database user_. From the `Security` tab, click `MongoDB Users` tab, then click `Add New User` button. An `Add New User` dialog will appear. Under `User Privileges`, select `Atlas admin`. Add a username and password for the database you will deploy to Atlas. Once you have done so, click on the `Add User` button.
- _Whitelist client connection to database_. From the `Security` tab, click `IP Whitelist` tab, then click `Add IP Address` button. An `Add Whitelist Entry` dialog will appear. Click the `Add Current IP Address` button, then click `Confirm` and wait for Atlas to update the firewall.
- _Get the URI connection string_. From the `Overview` tab, inside the Sandbox panel for your cluster, click on the `Connect` button. A `Connect to <YOUR CLUSTER NAME>` dialog will appear. Select `Connect Your Application`. Then select `Short SRV connection string`. In the `Copy the SRV address field`, copy the string. It will look something like this: `mongodb+srv://<Username>:<PASSWORD>@<Cluster>.mongodb.net/todo-db?retryWrites=true`. We will use this URI connection string to connect to the cluster from the server app in the next step.

### Step 7: Deploying the server app

We will use [Heroku](https://www.heroku.com) to deploy our server for [free](https://www.heroku.com/free).

- _Create a Heroku user account_. [Sign up](https://signup.heroku.com/login) for a free user account on Heroku.
- _Download and install the Heroku CLI_. Follow [these instructions](https://devcenter.heroku.com/articles/heroku-cli) to download and install the Heroku CLI.

Now that we have the tools necessary to interact with Heroku from the command-line, we will deploy our NodeJS server.

- _Log in to Heroku from the command-line_. Use the command `heroku login` from your terminal’s command-line to log in to Heroku.
- _Create the server app on Heroku_. Type `heroku create <YOUR_SERVER_APP_NAME>` on your command-line, where `<YOUR_SERVER_APP_NAME>` is a unique name on Heroku for your server app.
- _Set configuration for the server app_. With the Cloud Atlas cluster connection URI, which we will say is `<YOUR_CONNECTION_URI>` from the previous step, type `heroku config:set MONGODB_URL=<YOUR_CONNECTION_URI> --app <YOUR_SERVER_APP_NAME>`.
- _Deploy to Heroku_. Assuming you are deploying from your Git `master` branch, use this command to push to Heroku, where it will be built and deployed: `git push heroku master`.

If successful, your server app API will be accessible on the URL: `https://<YOUR_SERVER_APP_NAME>.herokuapp.com/`. You will need this URL in the next step.

### Step 8: Deploying the client app

Now that we have the database and server app deployed, we can deploy our client app, also using Heroku.

- _Set the environment_. In the client app’s `.env` file, set the server API endpoint which will be used by Apollo Client: `REACT_APP_API_URL=https://<YOUR_SERVER_APP_NAME>.herokuapp.com/`.
- _Create the client app on Heroku_. Type `heroku create <YOUR_CLIENT_APP_NAME>` on your command-line, where `<YOUR_CLIENT_APP_NAME>` is a unique name on Heroku for your client app.
- _Deploy to Heroku_. Assuming you are deploying from your Git `master` branch, use this command to push to Heroku, where it will be built and deployed: `git push heroku master`.

If successful, your client Todo app will be accessible on the URL: `https://<YOUR_CLIENT_APP_NAME>.herokuapp.com/`. Your app is now ready!

---

## Approach B: Serverless Architecture

Since we are now covering a “serverless” approach, we won’t be making a server, or even have to worry about connecting a database manually. All we need to do is code up the client side and let AWS do the rest of the heavy lifting.

Let’s get started with the [`todo-clientonly`](https://github.com/bowdentom/todo-clientonly) app, same as we did for the client-side of Approach A.

#### Preparation: Clone `todo-clientonly` App

In your terminal’s command-line:

```bash
git clone https://github.com/bowdentom/todo-clientonly.git todo-serverless
cd todo-serverless
```

### Step 1: Install AWS Amplify CLI

In the command-line, do a global install on your machine:

```bash
npm install -g @aws-amplify/cli
```

### Step 2: Configure the Amplify CLI

```bash
amplify configure
```

Then the following configuration steps are required:

- _Login_. This should open up the AWS Management Console in your browser. Log in to your AWS account, then return to your command-line. Hit `Enter` to continue.
- _Specify Region_. Specify the AWS Region, using your arrow keys. For example `us-east-1`.
- _Specify an IAM User_. Specify the username of a new IAM user. For example: `todo-serverless-cli-user`.
- _Add IAM User_. The `Add User` stepper in AWS Management Console should open in your browser.
  In your browser, the IAM user has some preconfigured settings that we can accept by clicking `Next: Permissions`, `Next: Tags`, `Next: Review`, and finally `Create User`. Once the IAM user has been created, we are given an `Access key ID` and a `Secret access key`. Make sure you copy these to a secure location, because we will need them next. Now you can return to your command-line. Hit `Enter` to continue.
- _Enter User Access Key_. Enter the access key id of the newly created user, which you got previously.
- _Enter User Secret Access Key_. Enter the secrete access key of the newly created user, which you got previously.
- _Specify a Profile Name_. Specify the profile name. For example: `todo-serverless-cli-user-profile`. Now the CLI has been configured and we’re ready to begin initializing new AWS Amplify projects.

### Step 3: Initialize Amplify Project

In the command-line, from the root of the `todo-serverless` app folder that you cloned during preparation:

```bash
amplify init
```

Then complete the following steps to configure Amplify for your project:

- _Specify Project Name_. Enter a name for the project. For example, choose the default name `todo-serverless` by pressing `Enter`.
- _Specify Environment Name_. Enter a name for the environment. For example: `dev`.
- _Choose Default Editor_. Choose your default editor, using the arrow keys. For example: `Visual Studio Code`.
- _Choose Programming Language of App_. Choose the type of app that you’re building. Select: `javascript`.
- _Choose Framework_. “What javascript framework are you using?” Select: `react`.
- _Specify Source Directory Path_. “Source Directory Path:” Enter: `src`, which should be the default.
- _Specify Distribution Directory Path_. “Distribution Directory Path:” Enter: `build`, which should be the default.
- _Specify the Build Command_. “Build Command:” Enter: `npm run-script build`, which should be the default.
- _Specify the Start Command_. “Start Command:” Enter: `npm run-script start`, which should be the default.
- _Use AWS Profile_? “Do you want to use an AWS profile?” Enter: `Y`.
- _Select AWS Profile_. “Please choose the profile you want to use”. Select: `todo-serverless-cli-user-profile`.

The CLI will start initializing the project in the cloud. This will take a few seconds.

If successful, you should see:

> Your project has been successfully initialized and connected to the cloud!

You may have noticed that Amplify CLI added a folder `amplify` to your `todo-serverless` project at the root level, and updated your `.gitignore` file.

### Step 4: Add API using Amplify

Now we can get started creating the GraphQL API for our app. AWS provides a managed GraphQL backend service called `AppSync`, which we will be using. In the command-line:

```
amplify add api
```

Then complete the following steps to add AppSync:

- _Select GraphQL API_. “Please select from one of the below mentioned services”. Select: `GraphQL`.
- _Specify API Name_. Provide an API name. For example: `TodoServerlessAppSyncApi`.
- _Choose API Authorization Type_. Choose an authorization type for the API. Select: `API key`. For our simple example app, we will not add authorization and authentication. If we wanted to sign in users, we would choose the `Amazon Cognito User Pool` option.
- _Existing GraphQL Schema_? “Do you have an annotated GraphQL schema?” Select: `N`.
- _Guided Schema Creation_? “Do you want a guided schema creation?” Select: `Y`.
- _Complexity of Data Relationships_. “What best describes your project:” Select: `Single object with fields (e.g., “Todo” with ID, name, description)`.
- _Edit Schema Now_? “Do you want to edit the schema now?” Select: `Y`.
- _Edit Amplify-Generated Schema_. Your code editor should open on the file on the Amplify-generated `schema.graphql` file at `todo-serverless/amplify/backend/api/TodoServerlessAppSyncApi/schema.graphql`.

You should see the following Amplify-generated schema code:

```js
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

Please update the `Todo` type to look like this:

```js
type Todo @model {
  id: ID!
  text: String!
  completed: Boolean!
}
```

Save your changes, and return to your command-line.

- _Continue GraphQL Autogeneration_. Hit `Enter` to continue.

If all went successfully, you should see the following message:

> GraphQL schema compiled successfully.
> Edit your schema at `<...>/todo-serverless/amplify/backend/api/TodoServerlessAppSyncApi/schema.graphql` or place `.graphql` files in a directory at `<...>/todo-serverless/amplify/backend/api/TodoServerlessAppSyncApi/schema`
> Successfully added resource `TodoServerlessAppSyncApi` locally.

Amplify has added the local folder `amplify/backend/api/` which contains your modified schema. You can now push these changes (and your configuration choices) up to AWS to create the resources for your backend in the cloud.

### Step 5: Push API Update to AWS

In the command-line, in order to build all your local backend resources and provision it in the cloud:

```
amplify push
```

Then complete the following steps to push the API to AWS:

- _Continue_. “Are you sure you want to continue?” Select `Y`.
- _Generate Code for New GraphQL API_? “Do you want to generate code for your newly created GraphQL API?” Select `Y`.
- _Choose Code Generation Language Target_. “Choose the code generation language target.” For example: `javascript`.
- _Specify GraphQL_. “Enter the file name pattern of graphql queries, mutations and subscriptions.” Enter `src/graphql/**/*.js`, which should be the default.
- _Generate All GraphQL Operations_? “Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions.” Select `Y`.
- _Specify Maximum Statement Depth_. “Enter maximum statement depth [increase from default if your schema is deeply nested].” Enter `2`, which should be the default.

You should now see the following message:
“Updating resources in the cloud. This may take a few minutes...”

If successful, you should see the message:

> ✔ Generated GraphQL operations successfully and saved at `src/graphql`
> ✔ All resources are updated in the cloud

Amplify has added the folder `src/graphql` to your project. Inside, you will see folders for `queries`, `mutations`, and `subscriptions`, and a `schema.json` file.

If you look inside the `queries` and `mutations` folders, you will see similar GraphQL queries to the ones we wrote by hand in the `Approach A: Serverful Architecture` section of this article, when creating the server-side app.

### Step 6: Configuring Amplify in the Serverless (Client-Only) App

Now that we have set up the “serverless” resources in `AWS AppSync`, we can add GraphQL request code in the client-side app `todo-serverless`.

The base level `index.js` component is where we will start. You may have noticed that Amplify automatically added a configuration file `todo-serverless/src/aws-exports.js` in a previous step, while setting up AWS AppSync. We will use this file when configuring Amplify in our client-only app.

Update the `index.js` file so that it looks like this:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'

import App from './components/App'
import 'todomvc-app-css/index.css'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

ReactDOM.render(<App />, document.getElementById('root'))
```

We will need to install `aws-amplify` to our project so that we can import `Amplify`. In your command-line, please either `yarn add aws-amplify` or `npm install aws-amplify`, to add it to our project.

### Step 7: Update the Serverless (Client-Only) App with GraphQL API Requests

Let’s move over to the `App` component file in the `src/components` folder. Update this file so that it looks like this:

```js
import React, { useState, useEffect } from 'react'
import { generate } from 'shortid'
import { API, graphqlOperation } from 'aws-amplify'

import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
import { listTodos } from '../graphql/queries'
import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations'

const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listTodos))
      // Note: todos are under listTodos.items in this schema...
      const fetchedTodos = response.data.listTodos.items
      setTodos(fetchedTodos)
    } catch (err) {
      console.log('Error in fetchTodos:', err)
    }
  }

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async todoText => {
    // Update UI immediately
    const addedTodo = {
      id: generate(),
      text: todoText,
      completed: false,
    }
    const updatedTodos = [...todos, addedTodo]
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const createTodoInput = {
        id: addedTodo.id,
        text: addedTodo.text,
        completed: addedTodo.completed,
      }
      await API.graphql(
        graphqlOperation(createTodo, { input: createTodoInput })
      )
    } catch (err) {
      console.log(`Error in addTodo API call with text ${todoText}: ${err}`)
    }
  }

  const removeTodo = async todoId => {
    // Update UI immediately
    const updatedTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const deleteTodoInput = {
        id: todoId,
      }
      await API.graphql(
        graphqlOperation(deleteTodo, { input: deleteTodoInput })
      )
    } catch (err) {
      console.log(`Error in removeTodo API call with id ${todoId}: ${err}`)
    }
  }

  const editTodo = async (todoId, todoText) => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.text = todoText
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: todoText,
        completed: editedTodo.completed,
      }
      await API.graphql(
        graphqlOperation(updateTodo, { input: updateTodoInput })
      )
    } catch (err) {
      console.log(
        `Error in editTodo API call with id ${todoId} and text ${todoText}: ${err}`
      )
    }
  }

  const completeTodo = async todoId => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.completed = !editedTodo.completed
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: editedTodo.text,
        completed: editedTodo.completed,
      }
      await API.graphql(
        graphqlOperation(updateTodo, { input: updateTodoInput })
      )
    } catch (err) {
      console.log(`Error in completeTodo API call with id ${todoId}: ${err}`)
    }
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) addTodo(text)
          }}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
```

You can now delete the `src/data` directory with the hardcoded todos.

You will notice how similar the API calls are to the ones we wrote in `todo-client-app`. This is all we have to do for this app.

You can now test your app locally, interacting with AWS AppSync’s DynamoDB in the cloud. From your command-line, either `yarn start` or `npm start` to start the development server on `localhost:3000` in the browser. Add a few todos in the app, and then check that the added todos appear in DynamoDB in the AWS Management Console.

### Step 8: Host the Serverless (Client-Only) App on S3

We can either choose `DEV` for S3 with HTTP or `PROD` for S3 with HTTPS with CloudFront distribution. We will go with S3 with HTTP for the purposes of this article.

From the command-line, we can add S3 hosting for our app:

```
amplify add hosting
```

Then complete the following steps to host the app:

- _Select Environment Setup_. “Select the environment setup:” Select: `DEV (S3 only with HTTP)`.
- _Specify Hosting Bucket Name_. “hosting bucket name”: Select the default name.
- _Specify Website’s `index` Document_. “index doc for the website”: Enter `index.html`, which should be the default.
- _Specify Website’s `error` Document_. “error doc for the website”: Enter `index.html`, which should be the default.

We can now deploy to S3 using the following command in the command-line:

```
amplify publish
```

Hit `Y` when prompted: “Are you sure you want to continue?”.

You will then see a message saying: “Updating resources in the cloud. This may take a few minutes...”

If everything was successful, you will receive the message:

> ✔ Uploaded files successfully. Your app is published successfully. http://<your-hosting-bucket-name>-dev.s3-website-us-east-1.amazonaws.com

Your browser should automatically open with a tab pointing to url `http://<your hosting bucket name>-dev.s3-website-us-east-1.amazonaws.com`.

Your app is now live on the web for you to share! Test it out, refresh the browser, and see all of your persisted todos! Congratulations on creating a serverless app!

---

## Comparing the Serverful and Serverless Approaches (A versus B)

After going through this detailed article, you will be able to appreciate the differences between the _serverful_ approach, in which you had to make two apps — for client and server — as well as separately deploy both in addition to a database, and the _serverless_ approach, where you only needed to make and deploy a single client-side app with some very simple configuration for AWS using Amplify.

When writing the backend API of a serverful GraphQL app, you need to create:

1. GraphQL server
2. GraphQL schema
3. GraphQL resolvers
4. Data source CRUD functions

Then, you need to deploy both the server and the database. These are non-trivial tasks, introducing potential errors and requiring ongoing maintenance. Even for this simple todo app, it took a significant amount of time and effort to complete these tasks.

Manually creating a backend API involves a lot of code and complexity that you can pass on to a managed GraphQL BaaS, such as AWS AppSync. This will enable you to iterate on your project more quickly, which is more [lean](http://theleanstartup.com/) and [agile](https://agilemanifesto.org/).

The authors of the UC Berkeley Technical Report entitled “[Cloud Programming Simplified: A Berkeley View on
Serverless Computing](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2019/EECS-2019-3.pdf)” predict that:

> Serverless computing will become the default computing paradigm of the Cloud Era, largely replacing serverful computing and thereby bringing closure to the Client-Server Era.

We believe that startups should strive to be ‘[Exponential Organizations](https://exponentialorgs.com/)’, leveraging cloud computing assets and technologies, and the serverless approach to making webapps is a step in the right direction.

Serverless is the future of making webapps. Welcome to the future!
