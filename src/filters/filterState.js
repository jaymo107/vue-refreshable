import passwordFilter from './passwordFilter';
import validInputFilter from './validInputFilter';

// Map of filters and functions to apply.
const FILTER_MAP = {
  valid: validInputFilter,
};

/**
 * Only store inputs that have passed validation criteria.
 *
 * @param {Object} currentState   The current state.
 * @param {Array} elements        Elements in the DOM.
 * @param {Object} modifiers      State modifiers.
 * @return {Object}
 */
export default (currentState, elements, modifiers) => {
  let state = { ...currentState };

  // Remove any password related values from being stored.
  state = passwordFilter(state, elements);

  // Apply other state filters.
  Object.keys(FILTER_MAP).forEach((key) => {
    if (key in modifiers && !!modifiers[key]) {
      state = FILTER_MAP[key](state, elements);
    }
  });

  return state;
};
