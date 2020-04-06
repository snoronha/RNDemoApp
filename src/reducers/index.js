const initialState = {
  items: {}, // {id1: {<item1>}, id2: {<item2>}, ... }
  cart: [], // [{id: <id1>, qty: <qty1>}, ...]
  favorites: [], // [{id: <id1>}, {id: <id2>}, ...]
  searchKwds: '',
};

// action = {qty: <qty>, item: <item>}
const addToCart = (state, action) => {
  let newCart = deepCopyObject(state.cart); // shallow copy done with Object.assign
  const itemId = action.payload.item.id;
  if (state.items[itemId]) {
    var matchIdx = -1;
    for (var idx in newCart) {
      if (newCart[idx].id === itemId) {
        // found the cart item to be incremented
        matchIdx = idx;
        newCart[idx].qty = action.payload.qty;
      }
    }
    if (matchIdx >= 0) {
      newCart[matchIdx].qty = action.payload.qty;
    } else {
      newCart.push({id: itemId, qty: 1});
    }
    return {
      items: state.items,
      cart: newCart,
      favorites: state.favorites,
      searchKwds: state.searchKwds,
    };
  } else {
    // Item not found - push onto cart, items
    newCart.push({id: itemId, qty: 1});
    let newItems = deepCopyObject(state.items);
    newItems[itemId] = action.payload.item; // update state.items
    return {
      items: newItems,
      cart: newCart,
      favorites: state.favorites,
      searchKwds: state.searchKwds,
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
        // let newItems = deepCopyObject(state.items);
        // delete newItems[itemId.toString()]; // toString necessary, seems shady - FIX
        newCart.splice(matchIdx, 1);
        return {
          items: state.items,
          cart: newCart,
          favorites: state.favorites,
          searchKwds: state.searchKwds,
        };
      } else {
        // update quantity
        newCart[matchIdx].qty = action.payload.qty;
        return {
          items: state.items,
          cart: newCart,
          favorites: state.favorites,
          searchKwds: state.searchKwds,
        };
      }
    } else {
      // No matching item found in cart
      console.log('ERROR: Item not found in cart!', state.cart, state.items);
      return state;
    }
  } else {
    // Item not found in items - throw error
    console.log('ERROR: Cart Item not found!', state.cart, state.items);
    return state;
  }
};

// assume action = {searchKwds: searchKwds}, searchKwds is a string
const setSearchKwds = (state, action) => {
  return {
    items: state.items,
    cart: state.cart,
    favorites: state.favorites,
    searchKwds: action.payload.searchKwds,
  };
};

// action = {item: <item>}
const heartItem = (state, action) => {
  let newFavorites = deepCopyObject(state.favorites);
  const itemId = action.payload.item.id;
  if (state.items[itemId]) {
    // Found item in items (item store: cart + fav items)
    found = false; // see if it exists in favorites
    for (var idx in newFavorites) {
      if (newFavorites[idx].id === itemId) {
        // found the favorite item do nothing
        found = true;
      }
    }
    if (!found) {
      newFavorites.push({id: itemId});
    }
    return {
      items: state.items,
      cart: state.cart,
      favorites: newFavorites,
      searchKwds: state.searchKwds,
    };
  } else {
    // Item not found - push onto favorites, items
    newFavorites.push({id: itemId});
    let newItems = deepCopyObject(state.items);
    newItems[itemId] = action.payload.item; // update state.items
    return {
      items: newItems,
      cart: state.cart,
      favorites: newFavorites,
      searchKwds: state.searchKwds,
    };
  }
};

// action = {item: <item>}
const unheartItem = (state, action) => {
  let newFavorites = deepCopyObject(state.favorites); // shallow copy done with Object.assign
  const itemId = action.payload.item.id;
  if (state.items[itemId]) {
    var matchIdx = -1;
    for (var idx in state.favorites) {
      if (state.favorites[idx].id === itemId) {
        matchIdx = idx;
      }
    }
    if (matchIdx >= 0) {
      // splice out the unhearted item from favorites
      // leave item in state.items (might be in cart)
      newFavorites.splice(matchIdx, 1);
      return {
        items: state.items,
        cart: state.cart,
        favorites: newFavorites,
        searchKwds: state.searchKwds,
      };
    } else {
      // No matching item found in favorites
      console.log(
        'ERROR: Item not found in favorites!',
        state.favorites,
        state.items,
      );
      return state;
    }
  } else {
    // Item not found in items - throw error
    console.log(
      'ERROR: Favorites Item not found!',
      state.favorites,
      state.items,
    );
    return state;
  }
};

// action = payload: {favorites: [<item1>, <item2>, ...]}
const setFavorites = (state, action) => {
  let favItems = action.payload.favorites;
  let newFavorites = [];
  let newItems = deepCopyObject(state.items);
  for (var idx in favItems) {
    let item = favItems[idx];
    if (!newItems[item.id]) {
      // Does not exist in new items, add in
      newItems[item.id] = item;
    }
    newFavorites.push({id: item.id});
  }
  return {
    items: newItems,
    cart: state.cart,
    favorites: newFavorites,
    searchKwds: state.searchKwds,
  };
};

// action = payload: {cart: [<item1>, <item2>, ...]}
const setCart = (state, action) => {
  let cartItems = action.payload.cart;
  let newCart = [];
  let newItems = deepCopyObject(state.items);
  for (var idx in cartItems) {
    let item = cartItems[idx];
    if (!newItems[item.id]) {
      // Does not exist in new items, add in
      newItems[item.id] = item;
    }
    newCart.push({id: item.id, qty: item.quantity});
  }
  return {
    items: newItems,
    cart: newCart,
    favorites: state.favorites,
    searchKwds: state.searchKwds,
  };
};

// Move this to util after done
// Deep copy of an Object
const deepCopyObject = (inObject) => {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // action = payload: {id: <id>, qty: <qty>, item: <item>}
      return addToCart(state, action);
    case 'REMOVE_FROM_CART':
      // action = payload: {id: <id>, qty: <qty>, item: <item>}
      return removeFromCart(state, action);
    case 'SET_SEARCH_KWDS':
      // action = payload: {searchKwds: searchKwds}
      return setSearchKwds(state, action);
    case 'HEART_ITEM':
      // action = payload: {id: <id>, item: <item>}
      return heartItem(state, action);
    case 'UNHEART_ITEM':
      // action = payload: {item: <item>}
      return unheartItem(state, action);
    case 'SET_FAVORITES':
      // action = payload: {favorites: [<item1>, <item2>, ...]}
      return setFavorites(state, action);
    case 'SET_CART':
      // action = payload: {cart: [<item1>, <item2>, ...]}
      return setCart(state, action);
    default:
      return state;
  }
};
