"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom"); // Import useNavigate for potential redirection
const NavBar = ({ isLoggedIn, onSignOut }) => {
    const [hoverIndex, setHoverIndex] = (0, react_1.useState)(-1);
    const navigate = (0, react_router_dom_1.useNavigate)(); // Use navigate for redirecting after sign out
    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease-in-out',
    };
    const hoveredLinkStyle = Object.assign(Object.assign({}, linkStyle), { backgroundColor: 'rgba(255, 255, 255, 0.2)' });
    const navbarStyle = {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundImage: 'url("/assets/NavBarImage/navbarImage.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    const handleSignOut = () => {
        // Clear user data from storage or invalidate session
        localStorage.removeItem('userId');
        // Call an optional sign out handler, if provided
        if (onSignOut) {
            onSignOut();
        }
        // Optionally, redirect the user to the homepage or login page
        navigate('/login');
    };
    const paths = isLoggedIn ? ['/', '/allUrls'] : ['/', '/login', '/createAccount'];
    return (react_1.default.createElement("nav", { style: navbarStyle },
        react_1.default.createElement("ul", { style: {
                listStyleType: 'none',
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px 0',
                margin: 0,
            } },
            paths.map((path, index) => (react_1.default.createElement("li", { key: path, style: { padding: '10px' } },
                react_1.default.createElement(react_router_dom_1.Link, { to: path, style: hoverIndex === index ? hoveredLinkStyle : linkStyle, onMouseEnter: () => setHoverIndex(index), onMouseLeave: () => setHoverIndex(-1) }, path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2))))),
            isLoggedIn && (react_1.default.createElement("li", { style: { padding: '10px' } },
                react_1.default.createElement("button", { onClick: handleSignOut, style: Object.assign(Object.assign({}, linkStyle), { background: 'none', border: 'none', cursor: 'pointer' }) }, "Sign Out"))))));
};
exports.default = NavBar;
