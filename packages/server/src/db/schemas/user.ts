import { SimpleUserInfo, User } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

type DB_User = Omit<User, 'favorite_worlds' | 'released_worlds'> &
    mongoose.Document & {
        password: string
        favorite_worlds: Types.ObjectId[] //填充时是Wolrd[]
        released_worlds: Types.ObjectId[] //填充时是Wolrd[]
        getInfo: () => User
        getSimpleInfo: () => SimpleUserInfo
    }

const UserSchema = new mongoose.Schema<DB_User>(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        avatar: String,
        role: { type: String, required: true },
        released_worlds: [{ type: Types.ObjectId, ref: 'worlds' }],
        favorite_worlds: [{ type: Types.ObjectId, ref: 'worlds' }]
    },
    {
        versionKey: false,
        methods: {
            getInfo() {
                return {
                    id: this._id,
                    username: this.username,
                    avatar: this.avatar,
                    role: this.role,
                    released_worlds: this.released_worlds,
                    favorite_worlds: this.favorite_worlds
                }
            },
            getSimpleInfo(): SimpleUserInfo {
                return {
                    id: this._id,
                    username: this.username,
                    avatar: this.avatar,
                    role: this.role
                }
            }
        },
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id
                delete ret._id
            }
        },
        toObject: {
            transform(_, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

export const UserModel = mongoose.model<DB_User>('user', UserSchema)
