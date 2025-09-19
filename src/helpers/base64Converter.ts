import fs from "fs"

export const base64Converter= (filePath:string):string=>{
return fs.readFileSync(filePath).toString("base64")
}