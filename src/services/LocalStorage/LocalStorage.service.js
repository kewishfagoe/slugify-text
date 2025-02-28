const LocalStorageService = {
    // save data to localStorage
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // get data from localStorage
    getItem: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null; // Parse JSON or return null if not found
    },

    // remove an item from localStorage
    removeItem: (key) => {
        localStorage.removeItem(key);
    },

    // clear all localStorage data (use carefully!)
    clear: () => {
        localStorage.clear();
    }
}

export default LocalStorageService;
