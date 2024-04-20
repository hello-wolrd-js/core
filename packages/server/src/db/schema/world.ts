import { World } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

//schema
//#region
const CheckedWorldSchema = new mongoose.Schema<World>(
    {
        id: Types.ObjectId,
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
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
const UncheckedWorldSchema = new mongoose.Schema<World>(
    {
        id: Types.ObjectId,
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
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
const ArchivedWorldSchema = new mongoose.Schema<World>(
    {
        id: Types.ObjectId,
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
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
//#endregion

// 区分为通过审核的世界和未通过审核的世界
export const CheckedWorldModel = mongoose.model<World>('checked-worlds', CheckedWorldSchema)
export const UncheckedWorldModel = mongoose.model<World>('unchecked-worlds', UncheckedWorldSchema)
export const ArchivedWorldModel = mongoose.model<World>('archived-worlds', ArchivedWorldSchema)
