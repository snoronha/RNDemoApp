export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      /*
      return [
        {
          cartCount: state[0].cartCount + 1,
        },
      ];
      */
      return state + 1;
    case 'DECREMENT':
      if (state > 0) {
        /*
        return [
          {
            cartCount: state[0].cartCount - 1,
          },
        ];
        */
        return state - 1;
      } else {
        return state;
      }
    default:
      return state;
  }
};
