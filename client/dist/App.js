"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
// Page Components
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const Login_1 = __importDefault(require("./pages/Login"));
const CreateAccount_1 = __importDefault(require("./pages/CreateAccount"));
const AllUrls_1 = __importDefault(require("./pages/AllUrls"));
const react_1 = __importDefault(require("react"));
function App() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(HomePage_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/createAccount", element: react_1.default.createElement(CreateAccount_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/getAllUrls", element: react_1.default.createElement(AllUrls_1.default, null) })))));
}
exports.default = App;
