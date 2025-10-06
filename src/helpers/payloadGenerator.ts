import {base64Converter} from "./base64Converter";
import {data} from "../lib/data";
import {webhookUrl} from "./signature";
import {PayloadType} from "../types";
import path from "path"

const filePath: string = path.join(process.cwd(), 'pdf',  '250903114119.pdf');
const baseUrl: string ="http://localhost:8000/test/odoo-webhook"
const secret: string = "whothehellwasthat"

export const payloadGenerator = (): PayloadType => {
    return {
        "name": "Parth Rajput",
        "email": "parth.rajput@alphadezine.com",
        "pdf_base64": base64Converter(filePath),
        "filtered_json": data,
        "webhook_url": baseUrl,
        "quoteNo":123456
    }
}