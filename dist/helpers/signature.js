"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const url_1 = require("url");
const webhookUrl = (url, secret) => {
    const parsed = new url_1.URL(url);
    const message = parsed.pathname + (parsed.search || "");
    const signature = crypto_1.default.createHmac("sha256", secret).update(message).digest("base64url");
    parsed.searchParams.set("signature", signature);
    return parsed.toString();
};
exports.webhookUrl = webhookUrl;
