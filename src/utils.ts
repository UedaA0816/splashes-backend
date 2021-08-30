import * as fs from "fs";

export const sleep = (msec:number) => new Promise(resolve => setTimeout(resolve, msec));

export const makeTempDirectory = (path:string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}  
}

export const getFileName = (filename: string) => new Date().getTime() + '-' + filename