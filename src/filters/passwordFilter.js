const TYPE_PASSWORD = 'password';

/**
 * Get password values, find the associated keys and omit them from
 * being stored in the state.
 *
 * @param {Object} currentState               The current state.
 * @param {Object} param1                     Element the directive is bound to.
 * @param {HTMLCollection} param1.elements    Children of the parent element.
 * @return {Object}
 */
export default (currentState, { elements }) => {
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
