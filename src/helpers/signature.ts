import crypto from "crypto"
import {URL} from "url"

export const webhookUrl=(url:string,secret:string):string=>{
    const parsed = new URL(url)
    const message:string  = parsed.pathname + (parsed.search || "")

    const signature:string  = crypto.createHmac("sha256", secret).update(message).digest("base64url")

    parsed.searchParams.set("signature",signature)
    return parsed.toString()
}