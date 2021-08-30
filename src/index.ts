import express, { Express, Request, Response, Router } from 'express'

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
import { logger } from "./logger";

import { get_photos_task, put_photo_task, delete_photo_task } from "./tasks/photo_task"

const app: Express = express()

const port = process.env.PORT || 3000

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json({ type: 'application/*+json' }));

// parse application/x-www-form-urlencoded 
app.use(express.urlencoded({
  extended: false,
  type: 'application/x-www-form-urlencoded'
}));

// GetとPostのルーティング
const router: Router = express.Router()

router.get("/photos", get_photos_task)

router.put('/photo', put_photo_task)

router.delete('/photo', delete_photo_task)

app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(port,()=> logger.info(`Example app listening on port ${port}!`) )