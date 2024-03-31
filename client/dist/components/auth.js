"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const react_1 = require("react");
function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // Check if userId is stored in localStorage
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId); // !! converts the value to a boolean: true if userId exists, false otherwise
    }, []);
    return isLoggedIn;
}
exports.useAuth = useAuth;
