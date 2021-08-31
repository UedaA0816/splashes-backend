import { MongoClient, Collection, ObjectId } from 'mongodb'
import { logger } from './logger'
import { Photo } from './models/photo'

const port = process.env.MONGODB_PORT||27017
const user = process.env.MONGODB_USER||""
const password = process.env.MONGODB_PASSWORD||""

// const MONGODB_URI = `mongodb://${user}:${password}@localhost:${port}/splashes`
const MONGODB_URI = `mongodb://localhost:${port}`

export const collections: {
  photos?: Collection<Photo>;
} = {}

export async function connect() {
  const client = await MongoClient.connect(MONGODB_URI)
  const dbname = process.env.MONGODB_DBNAME||""
  const db = client.db(dbname)
  collections.photos = db.collection<Photo>('photos')
}