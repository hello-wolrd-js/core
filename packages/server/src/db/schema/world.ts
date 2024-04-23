import { World } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

type DB_World = World & mongoose.Document

const WorldSchema = new mongoose.Schema<DB_World>(
    {
        id: Types.ObjectId,
        owner: { type: Types.ObjectId, ref: 'user' },
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        status: String
    },
    {
        versionKey: false,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

export const WorldModel = mongoose.model<World>('worlds', WorldSchema)
