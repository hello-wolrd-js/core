import { User } from '@core/models'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'

type DB_User = User &
    mongoose.Document & { password: string; getInfo: () => Omit<User, 'password'> }

const UserSchema = new mongoose.Schema<DB_User>(
    {
        id: Types.ObjectId,
        username: String,
        password: String,
        role: String,
        released_worlds: Array<String>,
        favorite_worlds: Array<String>
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
                    released_worlds: this.released_worlds,
                    favorite_worlds: this.favorite_worlds
                }
            }
        }
    }
)

export const UserModel = mongoose.model<DB_User>('user', UserSchema)
