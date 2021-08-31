import { ObjectId } from "mongodb"

export type Photo = {
  _id?: ObjectId,
  user_id: string,
  label: string,
  photo_uri: string,
  created_at: Date
}
