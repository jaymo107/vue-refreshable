import Refreshable from './refreshable';

const DIRECTIVE_NAME = 'refreshable';

export default {

  /**
   * @param {Object} Vue
   * @param {Object} options
   * @param {String} options.key      A custom localStorage key.
   * @param {Object} options.storage  Storage mechanism.
   */
  install(Vue, options = {}) {
    const refreshable = Refreshable(options);
    Vue.directive(DIRECTIVE_NAME, refreshable);
  },
};
