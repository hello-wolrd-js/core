import * as mongoose from 'mongoose'

await mongoose.connect('mongodb://127.0.0.1:27017/test')
import db from './world'
export { db }
