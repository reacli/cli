# Component architecture

## index.js

We created an `index.js` at the root of the component folder because we believe that whatever implementation it uses, other projects or components using it should not know, or mind the internal implementation. Therefore, the sole purpose of `index.js` is to import the `Container`, which will then include the `Dumb component` and export it. For now, we used `export default` because we think the `Container` should be the only reference point from outside of the component.

## components folder

We put components in a `components` folder because we believe that a `component` module can contain `services`, and `common` components. Other architectures put `component` files at the root of the module, but we prefer it that way for the aforementioned reasons.

### Container

We include a container in all components modules because we believe that any method and any state should be implemented in there. The dumb component's purpose should be only to display content.

The `Container` contains a class so we can add a constructor that will initiate the state and pass the props to the super constructor.

The `Container` is the one that will be interacting with Redux if needed.

### Dumb component

The dumb component receives its props from its container and is able to display HTML according to props.

We made it a `functional component` because we think it should not be stateful, and using `const`s in JavaScript seems less costy than using `class`es.

### Style

We created a `CSS` and `SCSS` files so that the user can decide weither they want to use one or the other, then we imported it in the `dumb component` and stored in in a `style` variable so we could call it later as a JavaScript object. Some call it "CSS in JS". We call it "useful"...