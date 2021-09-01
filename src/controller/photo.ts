import { ObjectId } from 'mongodb'
import { logger } from '../logger'
import { Photo } from '../models/photo'
import * as mongodb from './../mongodb'

export type getPhotosParam = {label?:string,user_id:string}

export async function getPhotos(conditions:getPhotosParam) {

  const photos = await mongodb.collections.photos
  
  const {user_id,label} = conditions
  const param = label ? {user_id,label:{$regex:label}} : {user_id}
  logger.debug({...param})
  return photos?.find({...param}).toArray()
}

export async function getIdPhoto(_id:ObjectId) {

  const photos = await mongodb.collections.photos

  return photos?.findOne({_id:_id})
}

export async function addPhoto(photo:Photo) {
  const res = await mongodb.collections.photos?.insertOne(photo)
  return res
}

export async function deletePhoto(_id:ObjectId) {
  const res = await mongodb.collections.photos?.deleteOne({_id:_id})
  return res
}