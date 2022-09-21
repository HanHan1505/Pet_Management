"use strict";

const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// const removeFromStorage = (key) => {
//     localStorage.removeItem(key);
// };
