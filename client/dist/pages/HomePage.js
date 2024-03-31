"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NavBar_1 = __importDefault(require("../components/NavBar"));
const HomePageImages_1 = __importDefault(require("../components/HomePageImages"));
const auth_1 = require("../components/auth");
function HomePage() {
    const isLoggedIn = (0, auth_1.useAuth)();
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: isLoggedIn }),
        react_1.default.createElement(HomePageImages_1.default, null)));
}
exports.default = HomePage;
