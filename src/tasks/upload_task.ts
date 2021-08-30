import { Request,Response } from "express";
import { logger } from "./../logger";

export const upload_task = async (req:Request, res:Response) => {
  logger.debug(req)
  res.send()   
}