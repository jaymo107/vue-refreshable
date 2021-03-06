import _ from 'lodash';
import Storage from './storage/store';
import filterState from './filters/filterState';

const DEFAULT_DELAY = 1000; // One second

/**
 * @param {Object} options
 * @param {String} options.key        A custom localStorage key.
 * @param {Object} options.storage    Storage mechanism.
 * @param {Number} options.delay      Storage delay time.
 */
export default (options = {}) => {
  const delay = options.delay || DEFAULT_DELAY;

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
     * @param {HTMLFormElement} el        DOM Element.
     * @param {Object} param1             Binding object.
     * @param {String} param1.arg         The key to restore data from
     * @param {String} param1.modifiers   Modifiers for the state.
     * @param {Object} param2             VNode.
     * @param {Object} param2.context     Vue Instance.
     */
    update: _.debounce((el, { arg, modifiers }, { context }) => {
      const { elements } = el;
      const state = filterState(context[arg], elements, modifiers);
      storage.set(state);
    }, delay),
  };
};
