"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadGenerator = void 0;
const base64Converter_1 = require("./base64Converter");
const data_1 = require("../lib/data");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), 'pdf', '250903114119.pdf');
const baseUrl = "http://localhost:8000/test/odoo-webhook";
const secret = "whothehellwasthat";
const payloadGenerator = () => {
    return {
        "name": "Parth Rajput",
        "email": "parth.rajput@alphadezine.com",
        "pdf_base64": (0, base64Converter_1.base64Converter)(filePath),
        "filtered_json": data_1.data,
        "webhook_url": baseUrl,
        "quoteNo": 123456
    };
};
exports.payloadGenerator = payloadGenerator;
