import { World } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

type DB_World = World & mongoose.Document

//schema
//#region
const CheckedWorldSchema = new mongoose.Schema<DB_World>(
    {
        id: Types.ObjectId,
        owner: { type: Types.ObjectId, ref: 'user' },
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
    },
    {
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        },
    }
)
const UncheckedWorldSchema = new mongoose.Schema<DB_World>(
    {
        id: Types.ObjectId,
        owner: { type: Types.ObjectId, ref: 'user' },
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
    },
    {
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        },
    }
)
const ArchivedWorldSchema = new mongoose.Schema<DB_World>(
    {
        id: Types.ObjectId,
        owner: { type: Types.ObjectId, ref: 'user' },
        name: String,
        cover: String,
        description: String,
        star: Number,
        url: String,
        checked: Boolean
    },
    {
        versionKey: false,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        },
    }
)
//#endregion

// 区分为通过审核的世界和未通过审核的世界
export const CheckedWorldModel = mongoose.model<World>('checked-worlds', CheckedWorldSchema)
export const UncheckedWorldModel = mongoose.model<World>('unchecked-worlds', UncheckedWorldSchema)
export const ArchivedWorldModel = mongoose.model<World>('archived-worlds', ArchivedWorldSchema)
