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
        worlds: Array<String>
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
                    worlds: this.worlds
                }
            }
        }
    }
)

export const UserModel = mongoose.model<DB_User>('user', UserSchema)
