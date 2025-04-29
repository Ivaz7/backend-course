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
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = express_1.default.Router();
// get all todo
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const todos = yield prismaClient_1.default.todo.findMany({
        where: {
            userId,
        }
    });
    res.json(todos);
}));
// create todo
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    const userId = req.userId;
    const result = yield prismaClient_1.default.todo.create({
        data: {
            task,
            userId
        }
    });
    res.json(result);
}));
// update todo
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { completed } = req.body;
    const { id } = req.params;
    const result = yield prismaClient_1.default.todo.update({
        where: {
            id: parseInt(id),
            userId,
        },
        data: {
            completed: !!completed
        }
    });
    res.json(result);
}));
// delete todo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.userId;
    const result = yield prismaClient_1.default.todo.delete({
        where: {
            id: parseInt(id),
            userId,
        }
    });
    res.json(result);
}));
exports.default = router;
