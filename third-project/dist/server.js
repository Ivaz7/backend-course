"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// use json file
app.use(express_1.default.json());
// config for telling where the public
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// routes
app.use('/auth', authRoutes_1.default);
app.use('/todos', authMiddleware_1.default, todoRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running in: ${PORT}`);
});
