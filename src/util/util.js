const util = {
  getRandomColor: () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  getRandomId: () => {
    var letters = '0123456789ABCDEF';
    var id = '';
    for (var i = 0; i < 12; i++) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  },

  deepCopyObject: inObject => {
    // Deep copy of an Object
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
  },
};

export default util;
