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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCareer = createCareer;
exports.getAllCareers = getAllCareers;
exports.getCareerById = getCareerById;
const pg_1 = require("pg");
const types_1 = require("./types/types");
const pool = new pg_1.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/mydb",
});
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact BIGINT NOT NULL,
    linkedin VARCHAR(255) NOT NULL )`;
        try {
            const result = yield pool.query(query);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        yield createTable().catch((err) => {
            console.log("error : " + err);
        });
    });
}
function createCareer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const validated = types_1.careersSchema.parse(data);
        const query = `
    INSERT INTO careers (name, email, contact, linkedin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
        const values = [
            validated.name,
            validated.email,
            validated.contact,
            validated.linkedin,
        ];
        let result;
        try {
            result = yield pool.query(query, values);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        if (!result) {
            throw "The result is missing";
        }
        console.log("Created");
        return result.rows[0];
    });
}
function getAllCareers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM careers;");
        return result.rows;
    });
}
function getCareerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM careers WHERE id = $1;", [
            id,
        ]);
        return result.rows[0];
    });
}
