const DIRECTIVE_NAME = 'refreshable';
const TYPE_PASSWORD = 'password';
const DEFAULT_STORAGE_KEY = 'vue-refreshable-state';

export default {

  /**
   * @param {Object} Vue
   * @param {Object} options
   * @param {String} options.key      A custom localStorage key.
   * @param {Object} options.storage  Storage mechanism.
   */
  install(Vue, options = {}) {
    const STORAGE_KEY = options.key || DEFAULT_STORAGE_KEY;
    const storage = options.storage || localStorage;

    /**
     * @param {Object} state    The current form state.
     */
    const persist = (state) => {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    /**
     * @return {Object}     The parsed state from storage.
     */
    const getState = () => {
      let stored = storage.getItem(STORAGE_KEY);

      if (stored) {
        try {
          stored = JSON.parse(stored);
        } catch (e) {
          //
        }
      }

      return stored || {};
    };

    /**
     * Delete the key when we unbind the component.
     */
    const clearStorage = () => {
      storage.removeItem(STORAGE_KEY);
    };

    /**
     * Get password values, find the associated keys and omit them from
     * being stored in the state.
     *
     * @param {Object} currentState               The current state.
     * @param {Object} param1                     Element the directive is bound to.
     * @param {HTMLCollection} param1.elements    Children of the parent element.
     * @return {Object}
     */
    const filterPasswordFields = (currentState, { elements }) => {
      const state = { ...currentState };
      const passwords = [];

      elements.forEach((element) => {
        if (element.type === TYPE_PASSWORD) {
          passwords.push(element.value);
        }
      });

      Object.keys(state).forEach((key) => {
        if (passwords.includes(state[key])) {
          delete state[key];
        }
      });

      return state;
    };

    Vue.directive(DIRECTIVE_NAME, {
      /**
       * When the component is first bound, set the data.
       *
       * @param {HTMLElement} el          DOM Element.
       * @param {Object} param1           Binding object.
       * @param {String} param1.arg       The key to restore data from
       * @param {Object} param2           VNode.
       * @param {Object} param2.context   Vue Instance.
       */
      bind(el, { arg }, { context }) {
        const storedState = getState();

        Object.keys(storedState).forEach((key) => {
          context[arg][key] = storedState[key];
        });
      },

      /**
       * Clear storage when the component is unmounted.
       */
      unbind: clearStorage,

      /**
       * Every time the data updates, persist to the storage.
       *
       * @param {HTMLFormElement} el          DOM Element.
       * @param {Object} param1           Binding object.
       * @param {String} param1.arg       The key to restore data from
       * @param {Object} param2           VNode.
       * @param {Object} param2.context   Vue Instance.
       */
      update(el, { arg }, { context }) {
        const state = filterPasswordFields(context[arg], el);
        persist(state);
      },
    });
  },
};
