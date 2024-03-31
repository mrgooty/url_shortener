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
const image1_jpg_1 = __importDefault(require("../assets/HomePageImages/image1.jpg"));
const HomePageImage = () => {
    const [url, setUrl] = (0, react_1.useState)('');
    const [customSlug, setCustomSlug] = (0, react_1.useState)(''); // State for the custom slug
    const [shortenedUrl, setShortenedUrl] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        event.preventDefault();
        setError(null);
        const userId = localStorage.getItem('userId');
        const apiEndpoint = 'http://localhost:3000/api/urls/shorten';
        try {
            const requestBody = userId ?
                { longUrl: url, userId, customSlug: customSlug.trim() } :
                { longUrl: url, customSlug: customSlug.trim() }; // Include customSlug in the body
            const response = yield fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = yield response.json();
                setShortenedUrl((_a = data.shortenedUrl) === null || _a === void 0 ? void 0 : _a.shortUrl);
            }
            else {
                const errorText = yield response.text();
                setError(`Error: ${response.status} ${errorText}`);
                setShortenedUrl(null);
            }
        }
        catch (error) {
            console.error('Error:', error);
            setError('Failed to fetch.');
        }
        setUrl('');
        setCustomSlug(''); // Reset custom slug input
    });
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('URL copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy URL:', err);
            alert('Failed to copy URL');
        });
    };
    return (react_1.default.createElement("div", { style: {
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${image1_jpg_1.default})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } },
        react_1.default.createElement("form", { onSubmit: handleSubmit, style: { width: '300px', textAlign: 'center' } },
            react_1.default.createElement("input", { type: "text", value: url, onChange: (e) => setUrl(e.target.value), placeholder: "Enter URL", style: { width: '100%', padding: '10px', marginBottom: '10px' }, required: true }),
            react_1.default.createElement("input", { type: "text", value: customSlug, onChange: (e) => setCustomSlug(e.target.value), placeholder: "Custom Slug (optional)", style: { width: '100%', padding: '10px', marginBottom: '10px' } }),
            react_1.default.createElement("button", { type: "submit", style: { width: '100%', padding: '10px' } }, "Submit"),
            shortenedUrl && (react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' } },
                react_1.default.createElement("span", { style: { wordWrap: 'break-word', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', marginBottom: '5px' } },
                    "Shortened URL: ",
                    react_1.default.createElement("a", { href: shortenedUrl, target: "_blank", rel: "noopener noreferrer" }, shortenedUrl)),
                react_1.default.createElement("button", { onClick: () => copyToClipboard(shortenedUrl), style: { cursor: 'pointer' } }, "Copy URL"))),
            error && react_1.default.createElement("p", { style: { color: 'red' } }, error))));
};
exports.default = HomePageImage;
