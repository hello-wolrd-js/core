import { User, World } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

type DB_User = Omit<User, 'favorite_worlds'> &
    mongoose.Document & {
        password: string
        favorite_worlds: string[]
        getInfo: () => Omit<User, 'password'>
    }

const UserSchema = new mongoose.Schema<DB_User>(
    {
        id: Types.ObjectId,
        username: String,
        password: String,
        role: String,
        released_worlds: [{ type: Types.ObjectId, ref: 'archived-worlds' }],
        favorite_worlds: [{ type: Types.ObjectId, ref: 'archived-worlds' }]
    },
    {
        versionKey: false,
        id: true,
        methods: {
            getInfo() {
                return {
                    id: this._id,
                    username: this.username,
                    role: this.role,
                    released_worlds: this.released_worlds as unknown as World[],
                    favorite_worlds: this.favorite_worlds as unknown as World[]
                }
            }
        }
    }
)

export const UserModel = mongoose.model<DB_User>('user', UserSchema)
