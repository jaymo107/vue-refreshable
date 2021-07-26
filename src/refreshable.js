import Storage from './storage/store';
import passwordFilter from './filters/passwordFilter';

export default (options = {}) => {
  const storage = new Storage({
    storage: options.storage,
    key: options.key,
  });

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
      const state = passwordFilter(context[arg], el);
      storage.set(state);
    },
  };
};
