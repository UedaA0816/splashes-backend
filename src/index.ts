import express, { Express, Request, Response, Router } from 'express'
import multer from "multer";

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import { logger } from "./logger";

import { upload_task } from "./tasks/upload_task"
import { multer_error_handling } from './tasks/multer_error_handling';

import { getFileName, makeTempDirectory } from './utils'
import AWS from 'aws-sdk';

const credentials = new AWS.SharedIniFileCredentials({profile: 'nvc-study'});
AWS.config.credentials = credentials;

const app: Express = express()

const tempDirectory = '/tmp/image-uploader';
// makeTempDirectory(tempDirectory)

// ファイル保存用
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, tempDirectory)
  },
  filename: function (req, file, cb) {
      cb(null, getFileName(file.originalname))
  }
})

const ram = multer.memoryStorage()

const _3MB = 3 * 1024 * 1024

// const upload = multer({ storage: storage})
const upload = multer({ storage: ram})
// const upload = multer({ storage: ram , limits:{fileSize:_3MB}})

const port = process.env.PORT || 3000

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
// app.use(express.json({ type: 'application/*+json' }));

// app.use(express.raw());

// parse application/x-www-form-urlencoded 
// app.use(express.urlencoded({
//   extended: false,
//   type: 'application/x-www-form-urlencoded'
// }));

// GetとPostのルーティング
const router: Router = express.Router()

const fieldName = "file"
const upload_error_handling = (res:Request,req:Response)=>upload.single(fieldName)(res,req,multer_error_handling)

router.post('/upload',upload.single(fieldName), upload_task)
// router.post('/upload',upload_error_handling, upload_task)

app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(port,()=> logger.info(`Example app listening on port ${port}!`) )