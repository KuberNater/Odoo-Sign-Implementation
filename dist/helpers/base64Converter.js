"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Converter = void 0;
const fs_1 = __importDefault(require("fs"));
const base64Converter = (filePath) => {
    return fs_1.default.readFileSync(filePath).toString("base64");
};
exports.base64Converter = base64Converter;
