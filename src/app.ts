import express, { Express, Request, Response } from "express"
import cors from "cors"
import { payloadGenerator } from "./helpers/payloadGenerator";
import { PayloadType } from "./types";
import axios from "axios"
import { verifyWebhook } from "./middlewares/middlware";

const app: Express = express()
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send(`Backend server started working `)
})

// API to create the sign request in Odoo
app.post('/api/sign/create', async (req: Request, res: Response) => {
    try {
        const payload: PayloadType = payloadGenerator();
        const { data, status } = await axios.post('http://localhost:8069/api/sign/create', payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        res.status(status).json(data);
    } catch (error: unknown) {
        console.log(`Internal server error: ${error}`);
    }
})

// Webhook to fetch the data from the odoo to the node.js server
app.post('/webhook/fetchdetails', verifyWebhook, (req: Request, res: Response) => {
    try {
        const webhook_data = req.body;
        console.log(`Webhook Data: ${JSON.stringify(webhook_data)}`)
        res.status(200).json({ message: "Webhook received", success: true });
    } catch (error: unknown) {
        console.log(`Internal server error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
})
app.post('/test/odoo-webhook', (req: Request, res: Response) => {
    try {
        const webhook_payload = req.body;
        console.log(`This is the odoo test webhook payload data : ${JSON.stringify(webhook_payload)}`)
    } catch (error) {
        console.log(`Error in calling the odoo web hook test`)
    }
})

app.post('/test/resend-hook', (req: Request, res: Response) => {
    try {
        const resendData = req.body;
        console.log( {resendData})
         res.status(200).json({ message: "Webhook received", success: true });
    } catch (error) {
        console.log(`Error in calling the test webhook`)
    }
})
export default app;
