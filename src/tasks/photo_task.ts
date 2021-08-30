import { Request,Response } from "express";
import { Photo, Photos } from "../models/photo";
import { ResponseBody } from "../models/response";
import { logger } from "./../logger";


export const get_photos_task = (req:Request, res:Response) => {
  // logger.debug(req)
  const photos: Photos = [
    {
      _id: "1",
      label: "testlabel",
      photo_url: "https://placehold.jp/150x150.png"
    },
    {
      _id: "2",
      label: "testlabel",
      photo_url: "https://placehold.jp/300x150.png"
    },
    {
      _id: "3",
      label: "testlabel",
      photo_url: "https://placehold.jp/300x150.png"
    },
    {
      _id: "4",
      label: "testlabel",
      photo_url: "https://placehold.jp/150x300.png"
    },
    {
      _id: "5",
      label: "testlabel",
      photo_url: "https://placehold.jp/450x450.png"
    },
  ]
  const body:ResponseBody<Photos> = {code:20000,data:photos}
  res.send(body)
}

export const put_photo_task = (req:Request, res:Response) => {
  // logger.debug(req)
  const photo:Photo = {
    _id:"1",
    label:"testlabel",
    photo_url:"https://placehold.jp/150x150.png"
  }
  const body:ResponseBody<Photo> = {code:20000,data:photo}
  res.send(body)
}

export const delete_photo_task = (req:Request, res:Response) => {
  // logger.debug(req)
  const photo:Photo = {
    _id:"1",
    label:"testlabel",
    photo_url:"https://placehold.jp/150x150.png"
  }
  const body:ResponseBody<Photo> = {code:20000,data:photo}
  res.send(body)
}