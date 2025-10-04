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
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const types_1 = require("./types/types");
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 3000;
// CORS configuration
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URLs
    credentials: true
}));
app.use(express_1.default.json());
app.post("/careers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = types_1.careersSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({
            msg: zod_1.z.treeifyError(body.error),
        });
    }
    const { name, email, contact, linkedin } = body.data;
    console.log(body.data);
    try {
        const dbQuery = yield (0, db_1.createCareer)({
            name,
            email,
            contact,
            linkedin,
        });
    }
    catch (e) {
        res.status(500).json({
            msg: "User already exists or Database went down",
        });
    }
    res.status(200).json({
        msg: "Career application received successfully",
        data: { name, email, contact, linkedin },
    });
}));
app.listen(port);
