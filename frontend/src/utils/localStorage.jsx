const setEncryptedItem = (name, data) => {
  try {
    let stringData;
    if (data !== null && typeof data === "object") {
      stringData = JSON.stringify(data);
    } else if (typeof data === "undefined") {
      stringData = "";
    } else {
      stringData = data.toString();
    }
    localStorage.setItem(name, stringData);
  } catch (e) {
    console.log(e);
  }
};

const getDecryptedItem = (name) => {
 try {
    const data = localStorage.getItem(name);
    if (data === null) {
      return null; 
    }
    return JSON.parse(data);
  } catch (e) {
    return localStorage.getItem(name);
  }
};

const handleLogout = () => {
    localStorage.clear();
};

export default {
  setEncryptedItem,
  getDecryptedItem,
  handleLogout
};
