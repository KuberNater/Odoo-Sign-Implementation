"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhook = void 0;
const crypto_1 = __importDefault(require("crypto"));
const secret = "whothehellwasthat";
const verifyWebhook = (req, res, next) => {
    try {
        const receivedSignature = req.query.signature;
        if (!receivedSignature) {
            return res.status(400).json({
                message: "Invalid signature",
            });
        }
        // Build the original message : path + query string
        const urlSearchParams = new URLSearchParams(req.query);
        urlSearchParams.delete("signature");
        const queryString = urlSearchParams.toString();
        const message = req.path + (queryString ? `${queryString}` : "");
        // Recomputing the HMAC
        const expectedSignature = crypto_1.default.createHmac("sha256", secret).update(message).digest("base64url");
        if (receivedSignature !== expectedSignature) {
            return res.status(403).json({
                message: "Invalid signature",
            });
        }
        console.log(`webhook matched !!!`);
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: `Internal Server Error: ${error}`
        });
    }
};
exports.verifyWebhook = verifyWebhook;
