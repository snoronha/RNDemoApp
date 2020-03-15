const util = {

  getRandomColor: () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  getRandomId: () => {
    var letters = "0123456789ABCDEF";
    var id = "";
    for (var i = 0; i < 12; i++) {
      id += letters[Math.floor(Math.random() * 16)];
    }
    return id;
  },

};

export default util;