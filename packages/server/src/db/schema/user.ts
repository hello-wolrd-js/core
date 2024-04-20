import { User } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

const UserSchema = new mongoose.Schema<User>(
    {
        id: Types.ObjectId,
        username: String,
        password: String,
        worlds: Array<String>
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

export const UserModel = mongoose.model<User>('user', UserSchema)
