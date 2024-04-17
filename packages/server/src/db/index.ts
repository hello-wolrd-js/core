import * as mongoose from 'mongoose'
// connect to database
await mongoose.connect('mongodb://127.0.0.1:27017/test')
export * from './world'
