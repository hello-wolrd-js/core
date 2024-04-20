import * as mongoose from 'mongoose'

await mongoose.connect('mongodb://localhost:27017/hello-world')
import world from './world'
import user from './user'
export const db = {
    world,
    user
}
