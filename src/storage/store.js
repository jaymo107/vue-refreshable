const DEFAULT_STORAGE_KEY = 'vue-refreshable-state';

export default class Store {
  /**
   * @constructor
   * @param {Object} options
   * @param {Object} options.storage    Storage mechanism.
   * @param {Object} options.key        Custom storage key.
   */
  constructor(options = {}) {
    this.storage = options.storage || localStorage;
    this.key = options.key || DEFAULT_STORAGE_KEY;
  }

  /**
   * @param {Object} state    The current form state.
   */
  set(state) {
    this.storage.setItem(this.key, JSON.stringify(state));
  }

  /**
   * @return {Object}     The parsed state from storage.
   */
  get() {
    let stored = this.storage.getItem(this.key);

    if (stored) {
      try {
        stored = JSON.parse(stored);
      } catch (e) {
        //
      }
    }

    return stored || {};
  }

  /**
   * Delete the key when we unbind the component.
   */
  clear() {
    this.storage.removeItem(this.key);
  }
}
