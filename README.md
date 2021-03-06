# Vue Refreshable
Persistant forms when you refresh.

[![Node.js CI](https://github.com/jaymo107/vue-refreshable/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/jaymo107/vue-refreshable/actions/workflows/node.js.yml) [![CodeQL](https://github.com/jaymo107/vue-refreshable/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/jaymo107/vue-refreshable/actions/workflows/codeql-analysis.yml) [![Node.js Package](https://github.com/jaymo107/vue-refreshable/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/jaymo107/vue-refreshable/actions/workflows/npm-publish.yml) ![npm](https://img.shields.io/npm/dw/vue-refreshable) ![NPM](https://img.shields.io/npm/l/vue-refreshable)

#### Todo
- [ ] Prevent collisions when switching pages.
- [x] ~Do we really need to pass in the data object?~
- [ ] Ability to omit fields.
- [x] ~Debounce storage.~
- [x] ~Don't store passwords.~
- [ ] Somehow check the data is valid when restoring?
- [ ] Encryption?
- [x] ~Tests.~
- [x] ~Linting (I disabled for now)~
- [ ] Instead of relying on the data object, actually make it matter where you put the directive and get the data from the child inputs of the form. Since it doesn't matter where you put the directive currently.

### Usage
Install the plugin globally.

```sh
npm i vue-refreshable --save-dev
```

```js
import Vue from 'vue';
import Refreshable from 'vue-refreshable';

Vue.use(Refreshable);
```

Then use the directive `v-refreshable` on the form element you'd like to save, passing in the name of the key where the form values are as an argument.

```html
<form v-refreshable:form></form>
```

Pass a `valid` modifier to only store elements that pass validation.
```html
<form v-refreshable:form.valid></form>
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

#### Options
```js
Vue.use(Refreshable, {
    key: 'storage-key',  // Custom key localStorage will use.
    storage: Storage,    // Storage object to use internally.
    delay: 1000,         // Delay before saving state.
});
```

#### Running the example
From the `/example` directory.
```
npm install
```

```
npm run serve
```

### Development
Install dependencies first
```
npm i
```

Running tests
```
npm run test
```
Building the module
```
npm run build
```
Auto-build on file changes
```
npm run build:watch
```
