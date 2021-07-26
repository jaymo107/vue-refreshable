import Storage from './storage/store';

const TYPE_PASSWORD = 'password';

export default (options = {}) => {
  const storage = new Storage({
    storage: options.storage,
    key: options.key,
  });

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

    for (const element of elements) {
      if (element.type === TYPE_PASSWORD) {
        passwords.push(element.value);
      }
    }

    Object.keys(state).forEach((key) => {
      if (passwords.includes(state[key])) {
        delete state[key];
      }
    });

    return state;
  };

  return {
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
      const storedState = storage.get();

      Object.keys(storedState).forEach((key) => {
        context[arg][key] = storedState[key];
      });
    },

    /**
     * Clear storage when the component is unmounted.
     */
    unbind: storage.clear.bind(storage),

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
      storage.set(state);
    },
  };
};
