export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      if (state.includes(action.payload)) {
        // already a favourite → remove it
        return state.filter((id) => id !== action.payload);
      }
      // not a favourite → add it
      return [...state, action.payload];
    default:
      return state;
  }
}