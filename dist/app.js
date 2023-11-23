"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// app initialization
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use((0, cors_1.default)());
// API routes
app.use('/api/v1', routes_1.default);
// general response
app.get('/', (req, res) => {
    return res.status(200).json({ error: false, msg: 'Welcome!' });
});
// handle unknown api
app.all('*', (req, res) => {
    return res.status(200).json({ error: true, msg: 'API route not found' });
});
// Global error handle
app.use((error, req, res, next) => {
    if (error instanceof Error) {
        console.error(error.stack);
        console.error(error.message);
        return res.status(500).json({ error: true, msg: 'Internal Server Error' });
    }
    else {
        return res.status(500).json({ error: true, msg: 'Something went wrong' });
    }
    next();
});
exports.default = app;
