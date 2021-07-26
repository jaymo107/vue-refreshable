/**
 * Only store inputs that have passed validation criteria.
 *
 * @param {Object} currentState        The current state.
 * @param {HTMLCollection} elements    Children of the parent element.
 * @return {Object}
 */
export default (currentState, elements) => {
  const state = { ...currentState };
  const invalid = [];

  for (const element of elements) {
    if (!element.validity.valid) {
      invalid.push(element.value);
    }
  }

  Object.keys(state).forEach((key) => {
    if (invalid.includes(state[key])) {
      delete state[key];
    }
  });

  return state;
};
