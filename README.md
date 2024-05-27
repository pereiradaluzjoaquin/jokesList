1. What's a closure? Where in the code is there a closure?
   A closure is a function that has access to its own scope, the outer function's scope, and the global scope, even though the outer function has finished executing.

In your JokesList component code, there is a closure in the handleSubmit function. This function is defined within the JokesList component function and accesses the loading, setLoading, setNewJoke, and getJokesAndSetData functions from its enclosing scope (JokesList). When handleSubmit is called, it retains access to these variables and functions, even if JokesList has finished executing

2. Which are the potential side-effects in any function? Could you point out any of these cases in
   your code? Are they expected? Can they be avoided?
   Potential side-effects in a function include modifying external variables or state, performing I/O operations, or making changes that affect the program's state outside the function's scope.

In handleSubmit and handleDeleteJoke: This two functions makes an API call, one to add a new joke and updates the component's state (newJoke and jokeList) based on the response and the other delete a joke and updates the component's state (jokeList).. This is an expected side-effect for adding a new joke. To avoid potential issues, I could add error handling to deal with failed API calls.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
