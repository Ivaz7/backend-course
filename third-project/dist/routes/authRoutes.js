"use strict";
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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = express_1.default.Router();
// register a new user (/auth/register)
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // encrypt password
    const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
    try {
        // insert a new user to the database
        const result = yield prismaClient_1.default.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        });
        // default todo
        // insert todo
        const defaultTodo = `Hello :) Add your first todo`;
        yield prismaClient_1.default.todo.create({
            data: {
                task: defaultTodo,
                userId: result.id
            }
        });
        // token jwt
        const jwtKey = process.env.JWT_KEY;
        //  create token a new user
        const token = jsonwebtoken_1.default.sign({ id: result.id }, jwtKey, { expiresIn: '24h' });
        res.json({ token });
        return;
    }
    catch (err) {
        console.log(err);
        res.sendStatus(503);
    }
}));
// login (/auth/login)
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // get user
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                username
            }
        });
        // if the user was not found
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        ;
        // get password
        const passwordUser = user.password;
        // sync compare encrypt the password
        const passwordIsValid = bcryptjs_1.default.compareSync(password, String(passwordUser));
        // if password does not match
        if (!passwordIsValid) {
            res.status(401).send("Your password is incorrect");
            return;
        }
        // token jwt
        const jwtKey = process.env.JWT_KEY;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtKey, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(503);
    }
}));
exports.default = router;
