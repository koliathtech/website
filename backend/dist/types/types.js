"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.careersSchema = void 0;
const zod_1 = require("zod");
exports.careersSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name cannot exceed 30 characters" }),
    email: zod_1.z.email({ message: "Please provide a valid email address" }),
    contact: zod_1.z.number({ message: "Contact must be a number" }),
    linkedin: zod_1.z
        .string()
        .min(5, { message: "LinkedIn URL must be at least 5 characters long" }),
});
