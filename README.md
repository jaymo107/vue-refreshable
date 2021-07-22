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

#### Usage
Install the plugin globally.

```js
Vue.use(Refreshable);
```

Then use the directive `v-refreshable` on the form element you'd like to save, passing in the object which contains the form data.

```html
<form v-refreshable="form"></form>
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