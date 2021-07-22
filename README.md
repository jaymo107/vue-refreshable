# Vue Refreshable
Persistant forms when you refresh.

## Don't use this, WIP.

#### Todo
- Prevent collisions when switching pages.
- Do we really need to pass in the data object?
- Ability to omit fields.
- Debounce storage.
- Somehow check the data is valid when restoring?
- Encryption.
- Tests.
- Linting (I disabled for now)
- Instead of relying on the data object, actually make it matter where you put the directive and get the data from the child inputs of the form. Since it doesn't matter where you put the directive currently.

#### Usage
Install the plugin globally.

```sh
npm i vue-refreshable --save-dev
```

```js
Vue.use(Refreshable);
```

Then use the directive `v-refreshable` on the form element you'd like to save, passing in the name of the key where the form values are as an argument.

```html
<form v-refreshable:form></form>
```

```js
data() {
    return {
        form: {
            name: '...',
            email: '...'
        }
    }
}

```

#### Running the example
From the `/example` directory.
```
npm install
```

```
npm run serve
```