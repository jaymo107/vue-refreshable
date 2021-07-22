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
         * @param {Object} state    The current form state.
         */
        const persist = (state) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        };

        /**
         * @return {Object}     The parsed state from storage.
         */
        const getState = () => {
            const storage = localStorage.getItem(STORAGE_KEY) || {};
            
            return JSON.parse(storage);
        };

        /**
         * Delete the key when we unbind the component.
         */
        const clearStorage = () => {
            localStorage.removeItem(STORAGE_KEY);
        };

        Vue.directive('refreshable', {
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

                Object.keys(storedState).forEach(key => {
                    context[arg][key] = storedState[key];
                });
            },

            /**
             * Clear storage when the component is unmounted.
             * 
             * @param {HTMLElement} el          DOM Element.
             * @param {Object} binding          Binding object.
             * @param {Object} vnode            VNode.
             */
            unbind(el, binding, vnode) {
                clearStorage();
            },

            /**
             * Every time the data updates, persist to the storage.
             * 
             * @param {HTMLElement} el          DOM Element.
             * @param {Object} param1           Binding object.
             * @param {String} param1.arg       The key to restore data from
             * @param {Object} param2           VNode.
             * @param {Object} param2.context   Vue Instance.
             */
            update(el, { arg }, { context }) {
                persist({ ...context[arg] });
            }
        });
    }
 }