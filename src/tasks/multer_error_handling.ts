import { Request,Response } from "express";
import multer from "multer";
import { logger } from "./../logger";

import { sleep } from "./../utils";

export const multer_error_handling = (err:any) => {
  // if (err instanceof multer.MulterError) {
  //   logger.log(err)
  // } else if (err) {
    
  // }
}