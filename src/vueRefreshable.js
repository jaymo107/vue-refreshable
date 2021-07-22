/* eslint-disable */

export default {

    /**
     * @param {Object} Vue 
     * @param {Object} options 
     * @param {String} options.key A custom localStorage key
     */
    install(Vue, options = {}) {
        const STORAGE_KEY = options.key || 'vue-refreshable-state';

        /**
         * @param {Object} state The current form state.
         */
        const persist = (state) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        };

        /**
         * @return {Object}
         */
        const getState = () => {
            const storage = localStorage.getItem(STORAGE_KEY);
            
            if (storage) {
                return JSON.parse(storage);
            }

            return {};
        };

        /**
         * Delete the key when navigating away.
         */
        const clearStorage = () => {
            localStorage.removeItem(STORAGE_KEY);
        };

        Vue.directive('refreshable', {
            /**
             * When the component is first bound, set the data.
             */
            bind(el, binding, vnode) {
                const storedState = getState();

                Object.keys(storedState).forEach(key => {
                    binding.value[key] = storedState[key];
                });
            },

            /**
             * Clear storage when the component is unmounted.
             */
            unbind(el, binding, vnode) {
                console.log('Clear storage');
                clearStorage();
            },

            /**
             * Every time the data updates, persist to the storage.
             */
            update(el, binding, vnode) {
                persist({ ...binding.value});
            }
          })
    }
 }