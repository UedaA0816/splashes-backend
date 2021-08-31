import { Request,Response } from "express";
import { ObjectId } from "mongodb";
import { addPhoto, deletePhoto, getIdPhoto, getPhotos, getPhotosParam } from "../controller/photo";
import { Photo } from "../models/photo";
import { ResponseBody } from "../models/response";
import { logger } from "./../logger";


export const get_photos_task = async (req:Request, res:Response) => {

  const label = req.query.label?.toString()
  const user_id = req.query.user_id?.toString()
  logger.debug("get_photos_task:Param",{label,user_id})

  //必須パラメータバリデーション
  if(!user_id) {
    logger.debug("get_photos_task:Validation:Param",{user_id})
    const response:ResponseBody<any> = {
      code:40300
    }
    res.status(403).send(response)
    return
  }

  const param:getPhotosParam = {user_id}
  if(label)param.label = label
  const photos = await getPhotos({...param})
  if(!photos){
    logger.error("get_photos_task:getPhotos",{param:{...param},photos})
    const response:ResponseBody<any> = {
      code:50000
    }
    res.status(500).send(response)
    return
  }

  const response:ResponseBody<Photo[]> = {
    code:20000,
    data:photos
  }
  logger.debug("get_photos_task:Success",{response})
  res.send(response)
}

export const put_photo_task = async (req:Request, res:Response) => {
  
  const {user_id,label,photo_uri} = req.body
  logger.debug("put_photo_task:Param",{user_id,label,photo_uri})

  //必須パラメータバリデーション
  if(!user_id || !label || !photo_uri) {
    logger.debug("put_photo_task:Validation:Param",{user_id,label,photo_uri})
    const response:ResponseBody<any> = {
      code:40300
    }
    res.status(403).send(response)
    return
  }

  const photo:Photo = {
    user_id,
    label,
    photo_uri,
    created_at:new Date()
  }
  const addedPhoto = await addPhoto(photo)
  if(!addedPhoto){
    logger.error("put_photo_task:getIdPhoto",{photo,addedPhoto})
    const response:ResponseBody<any> = {
      code:50000
    }
    res.status(500).send(response)
    return
  }

  const objectId = addedPhoto.insertedId
  const gotPhoto = await getIdPhoto(objectId)
  if(!gotPhoto){
    logger.error("put_photo_task:getIdPhoto",{objectId,gotPhoto})
    const response:ResponseBody<any> = {
      code:50000
    }
    res.status(500).send(response)
    return
  }

  const response:ResponseBody<Photo> = {
    code:20000,
    data:gotPhoto
  }
  logger.debug("put_photo_task:Success",{response})
  res.send(response)
}

export const delete_photo_task = async (req:Request, res:Response) => {

  const _id = req.body.objectId
  logger.debug("delete_photo_task:Param",{_id})

  //必須パラメータバリデーション
  if(!_id) {
    logger.debug("delete_photo_task:Validation:Param",{_id})
    const response:ResponseBody<any> = {
      code:40300
    }
    res.status(403).send(response)
    return
  }
  let objectId:ObjectId
  try {
    objectId = new ObjectId(_id)
  } catch (error) {
    logger.debug("delete_photo_task:Validation:ObjectId",{_id})
    const response:ResponseBody<any> = {
      code:40300
    }
    res.status(403).send(response)
    return
  }

  const currentPhoto = await getIdPhoto(objectId)
  if(!currentPhoto){
    logger.error("delete_photo_task:getIdPhoto",{objectId,currentPhoto})
    const response:ResponseBody<any> = {
      code:40300
    }
    res.status(403).send(response)
    return
  }

  const deletedPhoto = await deletePhoto(objectId)
  if(!deletedPhoto){
    logger.error("delete_photo_task:getIdPhoto",{objectId,deletedPhoto})
    const response:ResponseBody<any> = {
      code:50000
    }
    res.status(500).send(response)
    return
  }

  const response:ResponseBody<Photo> = {
    code:20000,
    data:currentPhoto
  }
  logger.debug("delete_photo_task:Success",{response})
  res.send(response)
}