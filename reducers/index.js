const initialState = {
  items: {}, // {id1: {<item1>}, id2: {<item2>}, ... }
  cart: [], // [{id: <id1>, qty: <qty1>}, ...]
  favIds: {}, // {id1: true, id2: true, ...}
};

// assume action = {qty: <qty>, item: <item>}
const addToCart = (state, action) => {
  let newCart = deepCopyObject(state.cart); // shallow copy done with Object.assign
  const itemId = action.payload.item.id;
  if (state.items[itemId]) {
    for (var idx in newCart) {
      if (newCart[idx].id === itemId) {
        // found the cart item to be incremented
        newCart[idx].qty = action.payload.qty;
      }
    }
    console.log('EXISTS: ', newCart);
    return {
      items: state.items,
      cart: newCart,
      favIds: state.favIds,
    };
  } else {
    // Item not found - push onto cart, items
    newCart.push({id: itemId, qty: 1});
    let newItems = deepCopyObject(state.items);
    newItems[itemId] = action.payload.item; // update state.items
    console.log('NEW:    ', newCart);
    return {
      items: newItems,
      cart: newCart,
      favIds: state.favIds,
    };
  }
};

const removeFromCart = (state, action) => {
  let newCart = deepCopyObject(state.cart); // shallow copy done with Object.assign
  const itemId = action.payload.item.id;
  if (state.items[itemId]) {
    var matchIdx = -1;
    for (var idx in state.cart) {
      if (state.cart[idx].id === itemId) {
        matchIdx = idx; // find the cart item to be decremented
      }
    }
    if (matchIdx >= 0) {
      if (action.payload.qty <= 0) {
        // qty <= 0, remove from cart, items
        let newItems = deepCopyObject(state.items);
        delete newItems[itemId.toString()]; // toString necessary, seems shady - FIX
        newCart = [
          ...newCart.slice(0, matchIdx),
          ...newCart.slice(matchIdx + 1),
        ];
        return {
          items: newItems,
          cart: newCart,
          favIds: state.favIds,
        };
      } else {
        // update quantity
        newCart[idx].qty = action.payload.qty;
        console.log('DECR:   ', newCart);
        return {
          items: state.items,
          cart: newCart,
          favIds: state.favIds,
        };
      }
    } else {
      // No matching item found in cart
      console.log('ERROR: Item not found in cart!', state.cart, state.items);
      return state;
    }
  } else {
    // Item not found in items - throw error
    console.log('ERROR: Item not found!', state.cart, state.items);
    return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // action = payload: {id: <id>, qty: <qty>, item: <item>}
      return addToCart(state, action);
    case 'REMOVE_FROM_CART':
      // action = payload: {id: <id>, qty: <qty>, item: <item>}
      return removeFromCart(state, action);
    default:
      return state;
  }
};

// Move this to util after done
// Deep copy of an Object
const deepCopyObject = inObject => {
  let outObject, value, key;
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] =
      typeof value === 'object' && value !== null
        ? deepCopyObject(value)
        : value;
  }
  return outObject;
};
