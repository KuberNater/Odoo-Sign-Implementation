export interface PayloadType {
    name: string,
    email: string,
    pdf_base64: string,
    filtered_json: Record<string, any>,
    webhook_url: string
}