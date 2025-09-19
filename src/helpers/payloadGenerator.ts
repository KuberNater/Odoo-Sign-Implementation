import {base64Converter} from "./base64Converter";
import {data} from "../lib/data";
import {webhookUrl} from "./signature";
import {PayloadType} from "../types";
import path from "path"

const filePath: string = path.join(process.cwd(), 'pdf',  '250903114119.pdf');
const baseUrl: string ="http://localhost:8000/webhook/fetchdetails"
const secret: string = "whothehellwasthat"

export const payloadGenerator = (): PayloadType => {
    return {
        "name": "quote.pdf",
        "email": "parth.rajput@alphadezine.com",
        "pdf_base64": base64Converter(filePath),
        "filtered_json": data,
        "webhook_url": webhookUrl(baseUrl, secret)
    }
}