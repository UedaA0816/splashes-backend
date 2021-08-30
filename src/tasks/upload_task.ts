import { Request,Response } from "express";
import * as AWS from "aws-sdk";
import { logger } from "./../logger";
import { GetObjectRequest, PutObjectOutput, PutObjectRequest } from "aws-sdk/clients/s3";
import * as fs from "fs";
import { getFileName } from "../utils";


export const upload_task = async (req:Request, res:Response) => {
  logger.debug(req.file)

  const file = req.file
  
  if( file == undefined ){
    res.status(403).send({code:40300})
    return
  }  

  const isFileImage = file.mimetype.includes("image")
  if(!isFileImage) {
    res.status(403).send({code:40301})
    return
  }

  const s3: AWS.S3 = new AWS.S3();
  const bucket = process.env.AWS_BUCKET_NAME||""
  // const key = file.filename //storage
  // const body = fs.readFileSync(file.path) //storage
  const key = getFileName(file.originalname) //ram
  const body = file.buffer //ram
  const params:PutObjectRequest = {
    Bucket:bucket,
    Key:key,
    Body:body,
    ACL:"public-read"
  }
  s3.putObject(params,(err, data) => {
    if (err) {
      logger.debug(err)
      res.status(500).send({code:50000})
      return
    }
    
    const resource_url = `https://${bucket}.s3.ap-northeast-1.amazonaws.com/${key}`

    res.send({code:20000,url:resource_url})
    
  });

}