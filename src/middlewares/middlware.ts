import crypto from "crypto"
import {NextFunction, Request, Response} from "express"

const secret: string = "whothehellwasthat"

export const verifyWebhook = (req: Request, res: Response, next: NextFunction) => {
    try {
        const receivedSignature = req.query.signature as string
        if (!receivedSignature) {
            return res.status(400).json({
                message: "Invalid signature",
            })
        }

        // Build the original message : path + query string
        const urlSearchParams = new URLSearchParams(req.query as any)
        urlSearchParams.delete("signature")
        const queryString: string = urlSearchParams.toString()
        const message = req.path + (queryString ? `${queryString}` : "");

        // Recomputing the HMAC
        const expectedSignature: string = crypto.createHmac("sha256", secret).update(message).digest("base64url");
        if (receivedSignature !== expectedSignature) {
            return res.status(403).json({
                message: "Invalid signature",
            })
        }
        console.log(`webhook matched !!!`)
        next();
    } catch (error: unknown) {
        return res.status(500).json({
            error: `Internal Server Error: ${error}`
        })
    }
}