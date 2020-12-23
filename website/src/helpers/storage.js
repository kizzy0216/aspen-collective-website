import * as SecureLS from 'secure-ls';
const ls = new SecureLS({ encodingType: 'rc4', isCompression: true, encryptionSecret: '7F7FDE952E93F5B84A6F7EF81751A' });
export const setItem = (key, value) => {
    try {
        ls.set(key, value);
        // localStorage.setItem(key, value);
        return true;
    }
    catch
    {
        return false;
    }
}
export const getItem = (key) => {
    let val =  String(ls.get(key));
    if(!val.length)
        val = null;
    return val;
    // return localStorage.getItem(key);
}
export const removeItem = (key) => {
    try {
        ls.remove(key);
        // localStorage.removeItem(key);
        return true;
    }
    catch
    {
        return false;
    }
}
export const removeAll = () => {
    try {
        ls.removeAll();
        // localStorage.clear();
        return true;
    }
    catch
    {
        return false;
    }
}