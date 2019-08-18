# Talk — Redux is dead, long live Redux

## About this repo

### Getting started

```bash
# Install dependencies
yarn

# Fetch pokemon data from API and store it locally
# This helps with presenting offline, but also allows us
# to control fake request speed
node create-cache

# Start dev server
yarn start
```

### Slides

```bash
# Start MDX Deck dev server
yarn start:slides
```

### Examples of other state management solutions

Look at the other branches to see some implementations of other state management solutions, i.e. 

* Local state
* React Context
* React Suspense.

## Talk Content

### Conclusion

I want to start with the conclusion, because realistically most people won't take the time to read the rest and the conclusion is the most important bit I want to convey here:

**Choose whatever solves your specific problem and works best for you, your team and your specific setup.**

That's it. That's all you need to take away from all of this. All solutions have their benefits and trade offs, all depending on what the exact use case, requirements and restrictions are. Anyone trying to tell you that you have to use a specifc solution without knowing what your problems and requirements are that you're trying to solve is a fraud.

### A bit of background to Redux

When [Dan Abramov](https://twitter.com/dan_abramov) introduced Redux in 2015 [at React Europe](https://www.youtube.com/watch?v=xsSnOQynTHs), he spent his time talking about the motivations behind creating it, as well as which problems it was aiming to solve. If you haven't seen the talk yet, I can only recommend to do so. It's excellent and really helps understand what Redux is and does.

According to him, the main motivations to write Redux were:

* state management that works with hot reloading
* predictable flux like state management with (ironically) less boilerplate
* tooling like time travel for better DX

**State management that works with hot reloading**

The problem: local state and other existing state management solutions had trouble when it came to hot reloading, utilising e.g. webpacks [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) functionality. It allows the dev server to only replace chunks of code related to changed files, without the need to refresh the page, which means the rest of the application stays untouched.

Redux works really well with this, because the state lives in an external store, which keeps track of state and actions. Any time e.g. reducers change, Redux can simply re-run all actions that happened so far, which means: not only does your state not get lost when you edit files, even better your app will pick up changes to reducers even for past actions, which is super powerful during debugging.

**Predictable flux like state management with less boilerplate**

[Flux](https://facebook.github.io/flux/) is Facebooks very own solution for state management, which was and still is pretty popular. If you haven't looked at it yet, do it. You'll notice, it is very (very) similar to Redux. And that is no accident.

According to Dan Abramov, Redux was supposed to be the implementation of the flux pattern, but with less boilerplate. Yes, as ironic as is sounds given what everyone in the community these days seems to complain about, originally Redux was there to cut down the code needed for predictable state management.

Why is Redux predictable? Because the state is read-only and only changed via pure functions, which are triggered by actions. This means, the same initial state with the same actions will always lead to the same outcome, no matter what.

**Tooling like time travel for better DX**

Dan's goal in general was better UX, but he especially pointed out his idea around time traveling, showing off a very early and basic version of today's Redux dev tools, allowing him to skip specific actions and commit a batch of actions to help with the coding and debugging process.

### Redux Principles

To this day, Redux follows three fundamental principles:

- single source of truth
- state is read-only
- changes to the state are only done by pure functions

**Single source of truth**

All state is handled by one store (you can have multiple stores, but it's generally discouraged, since it defeats this core pattern). Also, all actions go through this store, which means everything related to state management goes through the store as its single source of truth.

**State is read-only**

Exactly what it says. State in Redux is read-only, which means it cannot be directly changed or mutated.

**Changes to the state are only done by pure functions**

The only way to change the state is to dispatch actions, which then trigger [pure functions](https://www.freecodecamp.org/news/what-is-a-pure-function-in-javascript-acb887375dfe/). As explained, this will lead to predictability, which is exactly what you want when it comes to state management, especially the more complex the state you try to manage gets.

These pure functions are called reducers, since that is exactly what they do, reducing the state given specific actions.

Fun fact: this is also where the name comes from, **red**ucer and fl**ux** 🤯

### What are the benefits?

All the above things are more restrictions than anything. They lead to benefits, some of them were already mentioned, but generally they are trade offs. And this is an important part to be aware of. No solution for state management will work for all use cases and scenarios. There are always trade offs, and some trade offs are worth taking for some scenarios while not for others and vice versa.

Keeping that in mind, the question "what solution should I use" crumbles really quickly. It always depends on what problem you're actually trying to solve and what your specific use case is!

To be able to judge whether the trade offs are worth it, it always helps to look at the benefits Redux brings:

* state management that works with hot reloading
* predictable flux like state management
* tooling and large community
* due to structure easy to persist (e.g. using local storage)
* easy to make use of server or websockets to share state across multiple users/machines

### What are we using Redux for?

Some of the use cases I commonly see are:

* prevent prop drilling
* UI state (e.g. themes, tab and toggle states, etc.)
* Form data
* API data
* persist and automatically rehydrate state (e.g. local storage)

**Prevent prop drilling**

This is probably the most common use case, which is kind of the root motivaton for most of the other use cases as well. And its valid, Redux allows you to make data available to deeply nested component trees without having to pass it through all the levels as props.

However, this is also the most misunderstood use case in my view, since it's very vague, which means people constantly use it to claim "you don't need Redux for this, just use Context", which is generally true, Context solves very much the same problem, but this statement ignores any further circumstances which might add more requirements and restrictions to your solution.

There are a lot more considerations that should go into the "prevent prop drilling" use case, such as: How often does the data change? How many components rely on the data and how deeply nested is your app actually? 

**UI state**

Often simply to prevent having to pass these through as props, UI state refers to non static UI values, such as theme variables, tab and toggle states, etc.

With UI states there are similar considerations to be made: how many components rely on this UI state? Does it need to be persisted or at least kept on a top level independent from the component(s) that use it? Basically, could you even get away with using local state because the state is very isolated to the specific component?

**Form data**

I think this largely comes from the times where [`redux-form`](https://redux-form.com/8.2.2/) was really popular, which obviously benefited from the whole "redux all the things" movement a year or two ago.

We're repeating ourselves here, but the questions you should ask yourself: how many components do actually care about the form state, and are these actually far apart in the component tree? what benefits do I get from storing the form state in Redux vs. what trade offs am I dealing with?

One common issue with form state in Redux are suboptimal selectors when connecting any components to the store. Especially if you trigger an action on every input change (e.g. on every key stroke for text fields), this can not only add a lot of noise to Redux, but also trigger A LOT of unwanted re-renders in your app.

To be clear, this is not really a problem with Redux or Redux Form itself, but rather a bad effect from a bad/faulty implementation. But if easily made mistakes lead to such a big problem, its worth asking yourself what do I gain in return to make this worth the pain?

**API data**

This is probably the most controversial. I personally don't think Redux is the best place for API data. That being said, I use Redux for API data in pretty much all apps I'm working on. Not because it's the ideal solution, but more because it's the closest to that of what's currently available to me. Let me explain.

API data flow is usually pretty isolated, there are not many other state parts that rely on or act upon API actions. Therefore you don't really get many benefits from having the data in your store.

As to the downsides: Redux is not made for async actions out of the box. It supports it, and there are libraries that help with it, but by itself it can become pretty verbose really quick. On top of that, you run into similar issues as with the form data, where a lot of events are fired, usually at least 3 events per API call, if you have a bunch of API calls for a specific screen, that means a lot of Redux actions, which means a lot of re-renders when selectors are not properly implemented.

The reason why you'd put your API data into Redux is pretty straight forward. It's a handy place to store the data decoupled from your components, which means you can share the data between all your components. You can also easily keep the data when your components unmount, saving future API requests (which comes with its own problems of cache invalidation and garbage collection 🙈). You can easily persist the data to make your app work offline if needed. It helps with optimistic updates, treating the store as the source of truth and updating the data on the server in the background (again, potentially helping with offline scenarios).

These are a lot of benefits you get from using Redux. Depending on your app and your setup, these might easily outweigh the problems and trade offs, if so, good on you, Redux is definitely a solid solution for you. In case they don't, the question remains what alternatives are there that give you similar benefits without the trade offs?

One of the biggest problems with API data, which is admittingly unrelated to Redux, is loading and error states. Again, usually your goal is to normalise the API data, to allow you to reuse the data for components with the same or similar requests. Dealing with loading states for multiple consumers for the same data source can easily become tricky. In general, having to store loading and error states on its own can be pretty painful, always giving me the feeling we're doing something wrong here.

React Suspense for me seems like the perfect solution to this particular problem, dealing with loading states (and in combination with error boundaries also error states) in a completely new and in my opinion more intuitive way. Suspense works with cache providers, which ideally keep the normalised data received from the API and can deal with the concerns of cache invalidation and garbage collection. This comes down to the implementation of the cache provider, making the problem neatly consolidated.

Again, your use case might be different, your setup and team experience might be different, all of which can and should lead to different decisions on what the ideal solution for your specific problem should be.

**Persist and rehydrate data**

I kind of already hinted at this, but Redux makes persisting state and rehydrating it on initial load of your app fairly easy, providing libraries like [`redux-persist`](https://github.com/rt2zz/redux-persist). But I wouldn't use the availability of libraries as the main argument (you can easily find similar libraries for local state or context), the core reason why Redux is convenient for state persistance is the core principle of a "single source of truth". This means, that everything you need or want to do regarding persistence and rehydration can be done in one central place. Doing the same with a lot of different local states or contexts can easily grow out of hand.

Again, it obviously depends on what your state actually looks like. If it's very simple, only covering one or two context providers, doing the same with React Context doesn't add much if any overhead.

In fact, in the React context example in this repo you can see what the implementation of local storage with local state (in combination with React Context) could look like.

### What are the alternatives?

There are loads of alternatives to Redux. And that's good. Again, Redux solves a very specific problem, which means if your problem is different, you probably should use an alternative solution. Even the creator of Redux famosly keep preaching that you [might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), not saying that Redux is useless, but rather that it works for some use cases, while it might not work for others.

The most frequently mentioned "alternatives" seem to be:

* React Local State
* React Context
* React Hooks
* GraphQL and Apollo
* React Suspense

**React Local State**

Often state that ends up in Redux actually doesn't need to be there. If that is the case, i.e. because the state isn't shared between multiple components, it's always a good idea to try think small before going bigger. Does local state work for your use case? If it does, use it. It will make your Redux state smaller/less complex, helping a lot with keeping it sane and maintainable.

**React Context**

This is a weird one, since there are a lot of misconceptions out there. The root "why use Redux when you can use Context" is simply weird to me, since Redux uses Context under the hood. This is like saying "why drive a Tesla when you can drive a car". Sure, if a cheaper and simpler car works for you, you should consider buying that instead. But that doesn't mean that Teslas are generally useless.

By using plain Context without any form of abstraction you loose all the benefits mentioned before, that Redux' patterns and principles (read "restrictions") enforce. Which means, your state will likely be less predictable, there won't be a single source of truth and the debugging experience at scale will potentially suffer.

There are also technical considerations to be made. In its core (in a very simplified view), Redux is basically just a glorified reducer. Especially with the latest `useReducer` hook, [you can absolutely do this with Context](https://twitter.com/dan_abramov/status/1025400883687972866?lang=en) without using Redux, but at that stage you're basically re-inventing Redux, so you really should ask yourself what the benfits of that are vs. simply using Redux and build your abstractions on top of that where needed.

Context by itself also [isn't made for frequently changing state](?), that's just a fact. It isn't optimised to stop unnessasary re-renders etc, which Redux is solving for you by pulling the store (and the logic for determining whether or not a component connected to the store needs to re-render) outside of the React tree.

With all the above being said, Context is absolutely a valid alternative to a lot of use cases people currently use Redux for, and if you can pull out some of your Redux state into separate contexts to make your Redux state simpler and easier to grasp, you should do so, as long as you keep the above in mind and are aware of what this will mean. But it definitely doesn't (and is not even trying to) cover all scenarios Redux is used for.

I think in general people are weirdly hesitant to mix different solutions when it comes to state management. But if these different solutions solve all the different problems you have with your application state, it sounds like a pretty good solution to me to use whatever works best for the specific part of your state tree for that part 🤷‍♂️

**React Hooks**

Well, just no. Hooks have nothing to do with the problems Redux tries to solve. I don't really know where this misconception comes from, but I assume it stams from the `useReducer` hook, which allows you to use the reducer pattern in components easily for local state. While reducers were made popular by Redux, the library has in no way invented it and never claimed so. Hooks by themselves won't allow you to share this local state or get any of the other benefits Redux offers, so again, no, Hooks are not an alternative to Redux.

I guess this myth comes from the fact that you can use `useReducer` in combination with Context, in which case see above. Yes, this is an alternative, but if this solves your problem Redux wasn't the best choice even before, and you likely just picked it because of lack of alternatives (with legacy context being actively discouraged by the React team itself) or because of the hype in the community when Redux came out.

**GraphQL and Apollo**

I wont say too much about GraphQL and Apollo, mainly because I'm not actively using it and therefore my experience is very limited. What I do say is: yes, libraries like Apollo are definitely a good alternative to Redux, when it comes to API data! As stated before, placing your API data in Redux is likely not ideal. So any solution that treats that separate problem on its own seems great. But that still leaves us with a lot of other use cases, non-API related, that justify use of Redux. If you have none of those, sure, you don't need Redux. But that doesn't mean the same goes for everyone else.

**React Suspense**

Similar to GraphQL this just addresses the fact that Redux was never ideal for common data fetching scenarios. As mentioned, the way Suspense approaches async data handling in React is revolutionary and will definitely change how we thing about data flows in our apps, but again, this only covers the API use case. So alternative, yes, complete replacement likelt not.

### Busting some of the Myths around Redux

There are a lot of myths flying around about Redux. Here are just some of the most frequent examples I often get to hear.

**Redux is verbose**

Well, yes, but so is everything at scale if you don't abstract common patterns out. To get started, Redux is actually pretty compact, way more so than public opinion will make you believe lately.

As mentioned in the beginning, Redux was originally introduced to **reduce** the boilerplate needed to implement flux like state management, and it did a really good job for that.

If you find Redux to verbose, it's either because you didn't build abstractions where it would make sense, or it's because your application doesn't work well with flux like state management to begin with. Either way that's hardly Redux' fault.

**Redux is slow**

No, it isn't. Redux itself hardly does anything really. If it is slow for you, it's because your implementation is slow. Likely because selectors are expensive or even faulty, causing your app to constantly re-render unnecessarily. Again, not Redux' fault.

In fact, another myth "Redux is slower than plain Context" is simply wrong. Redux does a lot to keep the logic that determines whether or not a component needs to re-render on state changes outside of React, meaning React doesn't even get involved at all if the component doesn't need to change. It can't get much faster than that.

**Redux blows up your bundle size**

Redux comes at a [bundlesize of ~2.6KB](https://bundlephobia.com/result?p=redux@4.0.4), even React Redux only comes with [~5.6KB](https://bundlephobia.com/result?p=react-redux@7.1.0). Does that really "blow up" you bundle size? If so, good for you and you should absolutely look for alternatives that do what you need with less footprint.

Realistically, if you use Redux appropriately, any alternative, especially self written solutions based on context and `useReducer`, that than needs to be manually optimised for performance and maintainability, will likely lead to more code than the above. So not only will it still "blow up" your bundle, you now also have to maintain it yourself.

**You don't need Redux**

Maybe YOU don't need Redux, and that is great. If you can solve all your problems better by just using local state and Context, awesome. You should absolutely run `yarn remove redux react-redux` as soon as possible.

This doesn't mean the same can be said in general for everyone else. You don't know what other peoples problems are, why they are using Redux and how it works in their use case and with their requirements and restrictions.

### So what should I use?

If you're really expecting an answer here you either haven't been paying attention or you skipped everything written above.

I can't say it enough, choose whatever works best for you and your team. Please don't go from there and start preaching to others that they have to use the same solution you did. Rather go out and explain to the world why your solution worked so well for your specific use case. Help people make the decision what to use themselves.

This also works the other way round. Use the community to gather information about what solutions work for which problems. Don't strive for approval in the community, especially if they don't relate to the problem you're trying to solve. Whatever works for you and your team is a good solution.

## Resources

**Talks:**

- React Europe 2015 - Dan Abramov - Hot Reloading, Redux and Time Travel - https://www.youtube.com/watch?v=xsSnOQynTHs
- React Next 2019 - Mark Eriksen - A Deep Dive into React Redux - https://www.youtube.com/watch?v=zNs-phgKx3Q
- jsPoland 2018 - Mateusz Titz - Redux is dead, long live Redux - https://www.youtube.com/watch?v=gtVUCO_bUjs
- React Amsterdam 2018 - Kitze (Kristijan Ristovski) - React State Management In a GraphQL Era - https://www.youtube.com/watch?v=Q54YDGC_t3Y

**Articles & Docs:**

* https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
* https://redux.js.org/faq/general#further-information-1

