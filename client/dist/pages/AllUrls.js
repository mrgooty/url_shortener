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
const auth_1 = require("../components/auth");
const NavBar_1 = __importDefault(require("../components/NavBar"));
const image3_jpg_1 = __importDefault(require("../assets/AllUrlsImages/image3.jpg")); // Ensure the path is correct
const AllUrls = () => {
    const isLoggedIn = (0, auth_1.useAuth)();
    const [urls, setUrls] = (0, react_1.useState)([]); // Use the UrlData type for state typing
    (0, react_1.useEffect)(() => {
        const fetchUrls = () => __awaiter(void 0, void 0, void 0, function* () {
            // Retrieve userId from localStorage
            const userId = localStorage.getItem('userId');
            const apiUrl = 'http://localhost:3000/api/urls/all';
            if (!userId) {
                console.error('No userId found, ensure the user is logged in.');
                return; // Exit if not logged in or userId not found
            }
            try {
                const response = yield fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }), // Send userId in the request body
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = yield response.json(); // Explicitly type the response data as UrlData[]
                setUrls(data);
            }
            catch (error) {
                console.error('Error fetching URLs:', error);
                // Handle error here (e.g., set an error state and display a message)
            }
        });
        // Only fetch URLs if the user is logged in
        if (isLoggedIn) {
            fetchUrls();
        }
    }, [isLoggedIn]); // Depend on isLoggedIn to refetch when the login state changes
    // Define the background style
    const backgroundStyle = {
        backgroundImage: `url(${image3_jpg_1.default})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'auto', // Add scroll if content is larger than the viewport
    };
    return (react_1.default.createElement("div", { style: backgroundStyle },
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: isLoggedIn }),
        react_1.default.createElement("div", { style: { padding: '20px', color: 'white' } },
            react_1.default.createElement("h2", null, "URLs List"),
            react_1.default.createElement("table", { style: { width: '100%', tableLayout: 'fixed', border: '1px solid black' } },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Original URL"),
                        react_1.default.createElement("th", null, "Shortened URL"))),
                react_1.default.createElement("tbody", null, urls.map((url, index) => (react_1.default.createElement("tr", { key: index },
                    react_1.default.createElement("td", { style: { wordWrap: 'break-word' } }, url.longUrl),
                    react_1.default.createElement("td", { style: { wordWrap: 'break-word' } }, url.shortUrl)))))))));
};
exports.default = AllUrls;
