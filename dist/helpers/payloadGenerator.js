"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadGenerator = void 0;
const base64Converter_1 = require("./base64Converter");
const data_1 = require("../lib/data");
const signature_1 = require("./signature");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(process.cwd(), 'pdf', '250903114119.pdf');
const baseUrl = "http://localhost:8000/webhook/fetchdetails";
const secret = "whothehellwasthat";
const payloadGenerator = () => {
    return {
        "name": "quote.pdf",
        "email": "parth.rajput@alphadezine.com",
        "pdf_base64": (0, base64Converter_1.base64Converter)(filePath),
        "filtered_json": data_1.data,
        "webhook_url": (0, signature_1.webhookUrl)(baseUrl, secret)
    };
};
exports.payloadGenerator = payloadGenerator;
