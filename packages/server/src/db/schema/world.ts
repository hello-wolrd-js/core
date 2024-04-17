import { World } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

const worldSchema = new mongoose.Schema<World>(
    {
        id: Types.ObjectId,
        name: String,
        card: {
            title: String,
            cover: String,
            description: String,
            style: {
                width: Number,
                height: Number
            }
        },
        total: {
            star: Number
        },
        url: String
    },
    {
        // timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

export type WorldSchema = mongoose.InferSchemaType<typeof worldSchema>
export const WorldModel = mongoose.model<World>('World', worldSchema)
