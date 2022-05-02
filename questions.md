1. What is the difference between Component and PureComponent? give an example where it might break my app.

   The difference between Component and PureComponent is that the latter implements shouldComponentUpdate() using shallow comparison for props and state. Shallow comparison works by checking value equality in case of primitive types but in case of object types it checks the reference. That means that the equality check will fail for example if the prop passed to the Child (PureComponent) from the Parent is an array, even if the content of the array is the same.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

   ShouldComponentUpdate does not pair well with Context API. Whenever Context Provider's value prop changes, all its Consumers will re-render regardless if they implement shouldComponentUpdate method or not.

3. Describe 3 ways to pass information from a component to its PARENT.

4. Give 2 ways to prevent components from re-rendering.

- React.Memo() -> functional components
- PureComponent -> Class based components

5. What is a fragment and why do we need it? Give an example where it might break my app.

   A fragment is a way to wrap multiple JSX elements without adding an extra node in the DOM.

6. Give 3 examples of the HOC pattern.

7. what's the difference in handling exceptions in promises, callbacks and async...await.

   Try/catch block for async...await, .catch() for promises? Not sure here.

8. How many arguments does setState take and why is it async.

   SetState can take 2 arguments. First argument is an object or callback that is used to update the state. Second argument is a callback that runs after the first callback (1st argument) has ran. It is async for optimazation reasons. Updates are executed in batches.

9. List the steps needed to migrate a Class to Function Component.

- Change class to function
- Remove constructor and render method
- Replace lifecycle methods with hooks
- No need for bindings and this keyword

10. List a few ways styles can be used with components.

- CSS Stylesheet
- CSS Modules
- Inline styling
- Styled Components
- Tailwind CSS

11. How to render an HTML string coming from the server.

    Using dangerouslySetInnerHTML? Or make use of packages like editor-js etc..
