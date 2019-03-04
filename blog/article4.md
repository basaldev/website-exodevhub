---
date: 2019-03-04T09:00:00.000Z
title: 'React in a Serverless World'
banner:
type: post
category: react
shape:
language: en
medium:
author: Tom Bowden
---

# React in a Serverless World

“A comparison between client-server and serverless full-stack app architectures, with working app examples”

> The intended audience for this article is primarily front-end developers. This article assumes the reader is familiar with [React](https://reactjs.org/) and some basic [GraphQL](https://graphql.org/). In addition, the client-side app in this article uses the recently introduced [Hooks](https://reactjs.org/docs/hooks-intro.html) in React. Backend technologies will be explained in detail, so no previous understanding of topics such as Apollo Server, MongoDB, Mongoose, deployments, AWS, Amplify, and AppSync are assumed.

To clearly illustrate the differences between client-server and serverless approaches to building full-stack apps with React, let’s first start with a simple client-only app. The [TodoMVC project](http://todomvc.com/) is a well-known initiative that uses a Todo app to compare web frameworks. As a starting point, the [Todo MVC app](https://github.com/reduxjs/redux/tree/master/examples/todomvc) from the Redux repository was selected, some functionality was removed, and class-based components were switched out for functional components using React hooks. You can see the resulting app in the following [CodeSandBox](https://codesandbox.io/s/3r6jjoljpp):

<iframe src="https://codesandbox.io/embed/3r6jjoljpp" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

### Functionality of Client Side App

This Todo app is a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) app, where the user can:

- add todos by typing them into the text input area and hitting the enter key
- update todos by double-clicking a todo in the list
- delete todos by hovering over a todo and clicking the `×` icon
- mark todos as `completed` by clicking in the circular icon to the left of the todo

For the purposes of this simple example app, some example todos were added in a `data` folder as an array of todo objects. The app state data is held in memory, and is not persisted across browser refreshes.

### Basic Full-Stack App Architectures

Now we have a simple client-side app starting point, there are basically two separate approaches to add data persistence for users:

- _client-server architecture_, where the developer selects and deploys a backend server and a persistent data source (database), which we will refer to as a ‘serverful’ architecture
- _serverless architecture_, where the backend server and data source implementations are outsourced to a [BaaS](https://en.wikipedia.org/wiki/Mobile_backend_as_a_service) cloud provider

We will create two full-stack apps from our client-only app — one for each architectural approach — explaining the process for each in detail, so that we can evaluate the pros and cons of each approach. In addition, we have made the choice to only use packages written in JavaScript for both the client and the server, in the interest of simplicity.

## Approach A: Serverful Architecture

Download the client-only Todo app from [CodeSandBox](https://codesandbox.io/s/3r6jjoljpp) to code along. The following instructions are for Mac users.

### Step 1: Create the skeleton folder structure

Create a folder to house both the server code and the client app, so in your Terminal, do the following:

```
$ mkdir todo-serverful && cd todo-serverful
$ mkdir server
```

Now unzip and copy the downloaded client-only Todo app into the `todo-serverful` folder and rename it `client`. This skeleton structure clarifies server/client separation of concerns.

> Optionally, move the `.prettierrc` file from the client directory into the project base directory, for consistent styling, with the Terminal command `mv ../client/.prettierrc ../` (from the `server` folder).

### Step 2: Third-party packages for the server

Let’s get started on the server side. In your Terminal, move into your server folder, and initialize an npm package with default options selected, and create an `index.js` file to add our server code:

```
$ cd server
$ npm init --yes
\$ touch index.js
```

> There are countless different options for which backend server and database to select. We can either create a REST or GraghQL API. For this simple Todo app, creating a REST API would be much simpler than a GraphQL API. However, we believe GraphQL has many advantages over REST when it comes to iterative features and performance, and it also appears to be gaining popularity very quickly in not only the mobile developer community, but also the web developer community. So, we’ll use a GraphQL API for both our serverful and serverless approaches.

When it comes to creating a GraphQL backend server, a simple solution is provided by [Apollo](https://www.apollographql.com/). Apollo provides both server-side and client-side GraphQL packages. So, on the backend, we will use [Apollo Server (v2)](https://www.apollographql.com/docs/apollo-server/). Apollo Server is a community-maintained open-source GraphQL server, which works with many [Node.js](https://nodejs.org/en/) HTTP server frameworks. We will work with it as a [standalone](https://github.com/apollographql/apollo-server#installation-standalone) package, without integrating it with another web framework (such as Express, Koa, Hapi, etc.)

We will need to install two core dependencies which are necessary for responding to GraphQL requests:

```
$ npm install apollo-server graphql
```

The `apollo-server` package helps you define the shape of your data and how to fetch it, as well as running the backend server. The `graphql` library helps you build a [schema](https://graphql.org/learn/schema/) for your data and
to execute queries and muations on that schema.

### Step 3: Code the server

Now, let’s turn to getting the server working by editing the `index.js` file. We will follow a similar approach to that which is found in the Apollo “[Getting Started](https://www.apollographql.com/docs/apollo-server/getting-started.html)” documentation:

```
const { ApolloServer, gql } = require('apollo-server')

const { initialTodos } = require('../client/src/data')

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }

  type Query {
    listTodos: [Todo]
  }
`

const resolvers = {
  Query: {
    listTodos: () => initialTodos,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
```

So, what have we done here?

1. We import `ApolloServer` and the `gql` helper from the `apollo-server` package.
2. The hardcoded `todos` array was copied from the client-side `data/index.js` file, so that we temporarily have some data to test our initial implementation of the GraphQL server.
3. Next, we have the type definitions (`typeDefs`) for the Todo type and the root Query type, The Todo type consists of the [non-null](https://graphql.org/learn/schema/#lists-and-non-null) `id` field (itself of [scalar](https://graphql.org/learn/schema/#scalar-types) `ID` type), the non-null `text` field (scalar String type), and the non-null `completed` field (scalar Boolean type). The root `Query` consists of the `listTodos` field which yields an array of `Todo` objects. The type specifications are wrapped with `gql`, which is a template literal tag that is parsed into standard GraphQL [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (from the [`graphql-tag` package](https://github.com/apollographql/graphql-tag)).
4. After the type definitions, we have the `resolvers`. We specify only one resolver to get us started: a [root](https://graphql.org/learn/execution/#root-fields-resolvers) `Query` resolver called `listTodos` which is a function that returns our array of hardcoded todos (same `initialTodos` as we used in our client-side app).
5. With the `typeDefs` and `resolvers` specified, we can now create an instance of our `ApolloServer`.
6. Finally, the `server` instance can be be launched using the `listen` method. We print out the `url` where the server can be accessed in our web browser.

### Step 4: Start the server

In our Terminal, start the server (from the `server` folder) with:

```
node index.js
```

You should see the following output:

```
Server ready at http://localhost:4000/
```

Visiting `http://localhost:4000/` in our web browser, we should see the GraphQL Playground explorer tool. We can test if our `listTodos` query works correctly. Enter the following request query into the left panel:

```
query {
  listTodos {
  	id
    text
    completed
  }
}
```

Then hit the big playback button ▶︎. You should see the following response object:

```
{
  "data": {
    "listTodos": [
      {
        "id": "asdfgh",
        "text": "Do laundry",
        "completed": false
      },
      {
        "id": "qwerty",
        "text": "Wash dishes",
        "completed": true
      },
      {
        "id": "zxcvbn",
        "text": "Buy groceries",
        "completed": false
      }
    ]
  }
}
```

OK, so we now have a working backend Apollo server.

### Step 5: Improve the DX - Nodemon

In order to improve our developer experience, rather than repeatedly restarting the server with `node index.js` every time we make a change to our code, let’s install the `nodemon` utility, which will monitor for changes in our server application and automatically restart the server.

```
$ npm install --save-dev nodemon
```

Also, let’s add a start script in `package.json` so that we start the server in our Terminal with `npm start`. Inside the `scripts` object, add the following line above `test`:

```
"start": "nodemon index.js",
```

### Step 6: Improve the DX - Refactor files

Before we move on to adding a persistent data source (instead of using a makeshift hardcoded `initialTodos` array), let’s refactor our type definitions and resolvers into separate files, so that we can expand on them more easily and not have everything living in our server’s `index.js` file.

From the `server` folder, let’s create a file for our type definitions and other [schema](https://graphql.org/learn/schema/) objects, and a file for our resolvers:

```
$ touch schema.graphql resolvers.js
```

Copy the type definitions into the schema file, so the contents of `schema.graphql` look like this:

```
type Todo {
  id: ID!
  text: String!
  completed: Boolean!
}

type Query {
  listTodos: [Todo]
}
```

Now, we will need to access this schema within our `index.js` file. We do so by copying the contents of `schema.graphql` with a Node.js built-in utitity called `fs` (short for “file system”). Inside `index.js`, under `const { ApolloServer, gql } = require('apollo-server')`, import this utility:

```
const fs = require('fs')
```

We can now read the contents of `schema.graphql` into our `index.js` file, using the [`readFileSync` method](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options), which takes the file path of the file to be read synchronously as the first argument, and the encoding of the file as an optional second argument:

```
fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
```

Since we specify an encoding here, the file contents get returned as a string, rather than a buffer. Now we will need to wrap the returned string in the `gql` template tag to parse it into GraphQL AST. So, we will need to use the following line within our `index.js` file (replacing the variable declaration for `typeDefs`):

```
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }))
```

Now, in the `resolvers.js` file, enter the following code:

```
const { initialTodos } = require('../client/src/data')

const Query = {
  listTodos: () => initialTodos,
}

module.exports = { Query }
```

We can now replace the variable declaration for `resolvers` in `index.js` with:

```
const resolvers = require('./resolvers')
```

With that, our `index.js` file should look a lot leaner:

```
const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')

const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }))
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
```

Start the backend server from the `server` folder using `npm start`, and check if everything is working as expected.

### Step 7 - Expand our GraphQL schema

Now we have a separate file for our GraphQL schema (`schema.graphql`), we can add to it. At the moment, we just have our `Todo` and `Query` types. We will also need a `Mutation` type, detailing the functions that will create, delete, update, and toggle the completion of our todos:

```
type Mutation {
  createTodo(input: CreateTodoInput!): Todo
  deleteTodo(input: DeleteTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  toggleCompletion(input: UpdateTodoInput!): Todo
}
```

Each of these four mutation functions takes a non-null input, and yields data of type `Todo`. The input types `CreateTodoInput`, `DeleteTodoInput`, and `UpdateTodoInput` have not yet been specified. We will do that now using the [`input` keyword](https://graphql.org/learn/schema/#input-types):

```
input CreateTodoInput {
  id: ID
  text: String!
  completed: Boolean!
}

input DeleteTodoInput {
  id: ID
}

input UpdateTodoInput {
  id: ID!
  text: String
  completed: Boolean
}
```

These input types specify the shape of the data that has to be input into a GraphQL mutation for the client request to the backend to work. So, to create a new todo, `text` and `completed` need to be non-null, whereas the `id` can be omitted (because we will have it added the server). To delete a todo, the client just needs to give its `id` (if null, we will ensure a no-op).

With these additions, our completed `schema.graphql` file will look like this:

```
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

### Step 8 - Add more GraphQL resolvers

In our `resolvers.js` file, we currently only have one query resolver function:

```
const Query = {
  listTodos: () => initialTodos,
}
```

The `initialTodos` is an array of hard-coded todo objects. We will need to get these via our persistent data source, i.e. our database. We will make our resolvers agnostic of the choice of database, and even the way in which our backend interacts with our database. Let’s assume that we will later create a module called `db` which will contain functions for interacting with our database, for example to list our todos (`db.list`), to create new todos (`db.create`), to remove todos (`db.remove`), to update our todos (`db.update`), and to toggle the completion flag (`db.toggle`) of our todos.

So, first we will create a file to contain these database interaction functions in our `server` folder:

```
$ touch db.js
```

Now, let’s create stubs for the functions within `db.js`:

```
// TODO: Import package for interacting with our database

const list = async () => {
  // TODO: Get list of all todos from database
}

const create = async input => {
  // TODO: Create a new todo in our database
}

const remove = async input => {
  // TODO: Delete an existing todo in our database
}

const update = async input => {
  // TODO: Update an existing todo in our database
}

const toggle = async input => {
  // TODO: Toggle the completed flag of an existing todo in our database
}

module.exports = { list, create, remove, update, toggle }
```

Now that we have these stubs, we can return to our `resolvers.js` file and implement our `listTodos` resolver:

```
const db = require('./db')

const Query = {
  listTodos: () => db.list(),
}

module.exports = { Query }
```

Now, let’s add our first mutation. We will call the mutation to add a new todo `createTodo`. Now, all GraphQL resolvers receive [four arguments](https://graphql.org/learn/execution/#root-fields-resolvers):

1. `obj`: The previous (parent) object, which for root queries is often not used
2. `args`: The arguments provided to the field in the GraphQL query
3. `context`: A value which is provided to every resolver
4. `info`: A value which holds field-specific information relevant to the current query

We will only be needing the second argument for the resolvers in our example app: the `args`, which is an object that holds the client input to our mutations. Let’s add our `createTodo` mutation to `resolvers.js`:

```
const Mutation = {
  createTodo: (_, args) => db.create(args.input),
}
```

Now that we know how these resolver work, we can add easily add the remaining resolvers, which we will call `deleteTodo`, `updateTodo`, and `toggleCompletion`. The completed `resolvers.js` file should look like this:

```
const db = require('./db')

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

### Step 9 - Run MongoDB on your local machine

In the next steps, we will now remove the hardcoded todos and attach a database instead.

> When it comes to choosing a database, there are countless options available to us. In addition, do we use native drivers for Node.js, or is it better to use an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)? The choice will depend entirely on the requirements of your project. For our simple app, we have chosen [MongoDB](https://www.mongodb.com/what-is-mongodb), a free and open-source database which stores data in JSON-like documents, as our persistent data source, and we will interact with it through [Mongoose](https://mongoosejs.com/), a simple ORM for Node.js.

Ensure you have [MongoDB installed and running](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/) in a separate Terminal instance:

```

mongod

```

You should see something like the following at the end of the print out: `[initandlisten] waiting for connections on port 27017`. If you do, you’ve got a local instance of MongoDB running on your Mac.

### Step 10 - The Mongoose ORM

First, let’s add the Mongoose package to our server:

```

npm install mongoose

```

Now, let’s set up Mongoose to interact with our MongoDB database. Following [Mongoose’s documentation](https://mongoosejs.com/), in our server folder’s `index.js`, add the following lines:

```

// Import Mongoose ORM
const mongoose = require('mongoose')

// Connect to MongoDB database (ensure MongoDB is running...)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

// Create a Mongoose model, first argument is the model name, second argument is the `Schema`
const Cat = mongoose.model('Cat', { name: String })

// Create a `kitty` document of model `Cat` with name `Zildjian`
const kitty = new Cat({ name: 'Zildjian' })

// Save `kitty` to the MongoDB database
kitty.save().then(() => console.log('meow'))

```

Ensure MongoDB is running (with `mongod` in a separate Terminal instance), and then restart our server (which is necessary after installing a new npm package) with `npm start`. You should see `meow` print to your Terminal.

### Step 11: Improve the DX - Robo 3T

A nice free GUI for seeing what’s in your MongoDB database is [Robo 3T](https://robomongo.org/). You can [download it here](https://robomongo.org/download).

Open the Robo 3T app and connect to your MongoDB database (`File > Connect...`, then `Create`). A `Connection Settings` dialog box will appear. Ensure `Type:` is `Direct Connection`, for `Name:` enter `Test Connection`, and ensure `Address:` is `localhost` (same as `127.0.0.1`), and the port is `27017`. Then hit `Save`. Now `Connect` to the connection called `Test Connection`.

Note that in MongoDB, we have `collections` that comprise `documents` with your data. If you are more familiar with relational databases, a `collection` is akin to a relational db’s `table`, and a `document` is akin to a `record` of data.

The main GUI will open as a separate window. Please select `Options` > `Display View Mode` > `Text Mode`.
In the left panel, under `Test Connection` > `test` > `Collections`, click on the collection `cats`, and you will see the `kitty` document we created:

```
/* 1 */
{
  "_id" : ObjectId("5c7cd3c2ae1a51bfb172e107"),
  "name" : "Zildjian",
  "__v" : 0
}
```

MongoDB automatically generates a unique `_id` for the document and versions the document `__v`.

### Step 12: Adding a Mongoose schema and model

Everything in Mongoose starts with a [Schema](https://mongoosejs.com/docs/guide.html). It is completely distinct from our GraphQL schema. A Mongoose schema maps to a MongoDB collection, and defines the shape of documents within that collection.

For example, a simple Todo app schema for Mongoose could be:

```
const todoSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
})
```

It defines the shape of our todos as having `String` types for the `id` and `text` fields, and a `Boolean` type for the `completed` field.

To use our `todoSchema` definition, we convert it into a Mongoose model that we can work with, which we will call `Todo`:

```
const Todo = mongoose.model('Todo', todoSchema)
```

Now we can create documents with instances of our `Todo` model using Mongoose.

So, let’s create a new file in our `server` folder, and call it `model.js`:

```
$ touch model.js
```

Within this `model.js` file, enter the following:

```
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

We have elaborated on our Schema a little, specifying that each field is required (non-null), `completed` has a default value of `false`, `text` cannot be an empty string `''`, and the white-space from the beginning and end of the `text` is removed (trimmed off). The Model is specified using the Schema, and it is exported from this file.

### Step 13: Interact with the database using Mongoose

Now that we have our Mongoose Schema and Model specified, we can fill in the stubs in `db.js`. At the top of the file, import the Mongoose library and our model file:

```
const mongoose = require('mongoose')

const { Todo } = require('./model')
```

Now we can start with our first stub, the `list` function. In Mongoose, to get all documents in a collection, we use the [`Model.find()` method](https://mongoosejs.com/docs/api.html#model_Model.find):

```
const list = async () => {
  try {
    const todos = await Todo.find()
    if (!todos) return []
    return todos
  } catch (err) {
    console.log(`Error in list todos: ${err}`)
  }
}
```

All database operations are asynchronous, so we are using the [`async/await` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to deal with the [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The next stub, the `create` function, requires an input object be passed to a newly created document, when is then saved to the database with the [`Document.prototype.save()`](https://mongoosejs.com/docs/api.html#document_Document-save) method:

```
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
    console.log(`Error in create todo with text ${todoText}: ${err}`)
  }
}
```

The `remove` function takes the `id` field from the input object, and is used with the [`Model.findOneAndDelete()` method](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete):

```
const remove = async input => {
  try {
    if (!input.id) return
    const removedTodo = await Todo.findOneAndDelete({ id: input.id })
    return removedTodo
  } catch (err) {
    console.log(`Error in remove todo with id ${input.id}: ${err}`)
  }
}
```

The `update` function is used with the [`Model.findOneAndUpdate()` method](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate). This method finds a matching document based on the conditions in the first argument, updates the document based on the second argument, and if `{new: true}` is added in the optional third argument, then the modified document is returned (rather than the original document, which is the default behavior).

```
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
```

The `toggle` function also updates a document in the database. First, we need to find the todo for which we want to toggle the `completed` boolean. For this, we use the [`Model.findOne()` method](https://mongoosejs.com/docs/api.html#model_Model.findOne). Then we update it.

```
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
```

That’s all we need to do in the `db.js` file. The complete file should look like this:

```
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
    console.log(`Error in create todo with text ${todoText}: ${err}`)
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

### Step 14: Connecting to our database

Now, that our backend schema, resolvers, and database interactions are complete, in `index.js` within our `server` folder, we can now set up a new connection to our database. We will call it `todo-api`:

```
mongoose.connect('mongodb://127.0.0.1:27017/todo-api', {
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('We are connected to MongoDB'))
```

So, our completed `index.js` server file should now look like this:

```
const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todo-api', {
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('We are connected to MongoDB'))

const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }))
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`GraphQL server ready on ${url}`))
```

### Step 15: Testing our API with GraphQL Playground
