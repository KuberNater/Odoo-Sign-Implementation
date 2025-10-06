"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const payloadGenerator_1 = require("./helpers/payloadGenerator");
const axios_1 = __importDefault(require("axios"));
const middlware_1 = require("./middlewares/middlware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`Backend server started working `);
});
// API to create the sign request in Odoo
app.post('/api/sign/create', async (req, res) => {
    try {
        const payload = (0, payloadGenerator_1.payloadGenerator)();
        const { data, status } = await axios_1.default.post('http://localhost:8069/api/sign/create', payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        res.status(status).json(data);
    }
    catch (error) {
        console.log(`Internal server error: ${error}`);
    }
});
// Webhook to fetch the data from the odoo to the node.js server
app.post('/webhook/fetchdetails', middlware_1.verifyWebhook, (req, res) => {
    try {
        const webhook_data = req.body;
        console.log(`Webhook Data: ${JSON.stringify(webhook_data)}`);
        res.status(200).json({ message: "Webhook received", success: true });
    }
    catch (error) {
        console.log(`Internal server error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post('/test/odoo-webhook', (req, res) => {
    try {
        const webhook_payload = req.body;
        console.log(`This is the odoo test webhook payload data : ${JSON.stringify(webhook_payload)}`);
    }
    catch (error) {
        console.log(`Error in calling the odoo web hook test`);
    }
});
app.post('/test/resend-hook', (req, res) => {
    try {
        const resendData = req.body;
        console.log(`This is the data of the resend mail : ${JSON.stringify(resendData)}`);
    }
    catch (error) {
        console.log(`Error in calling the test webhook`);
    }
});
exports.default = app;
