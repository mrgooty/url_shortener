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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom"); // Import useNavigate instead of useHistory
const NavBar_1 = __importDefault(require("../components/NavBar"));
const image2_jpg_1 = __importDefault(require("../assets/loginImage/image2.jpg"));
const auth_1 = require("../components/auth");
const CreateAccount = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const isLoggedIn = (0, auth_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)(); // Use useNavigate hook for navigation
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        console.log("Creating account with email:", email, "and password:", password);
        const endpoint = 'http://localhost:3000/api/users/createUser';
        try {
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = yield response.json();
            console.log('Account created successfully:', data);
            if (data.userId) {
                localStorage.setItem('userId', data.userId);
                console.log('UserId stored in localStorage');
                navigate('/'); // Redirect to the homepage using navigate
            }
        }
        catch (error) {
            console.error('Failed to create account:', error);
            // Handle error (e.g., show an error message to the user)
        }
    });
    const backgroundStyle = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${image2_jpg_1.default})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', // Center the background image
    };
    return (react_1.default.createElement("div", { style: backgroundStyle },
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: isLoggedIn }),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' } },
            react_1.default.createElement("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', width: '20%', backgroundColor: 'rgba(255,255,255,0.8)', padding: '20px', borderRadius: '10px' } },
                react_1.default.createElement("label", { htmlFor: "email" }, "Email:"),
                react_1.default.createElement("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, style: { marginBottom: '10px', padding: '10px' } }),
                react_1.default.createElement("label", { htmlFor: "password" }, "Password:"),
                react_1.default.createElement("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, style: { marginBottom: '20px', padding: '10px' } }),
                react_1.default.createElement("button", { type: "submit", style: { padding: '10px' } }, "Create Account")))));
};
exports.default = CreateAccount;
