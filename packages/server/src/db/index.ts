import { connect } from 'mongoose'
import config from '@root/hwjs.config'

await connect(config.server.mongodb.host)
import world from './world'
import user from './user'
export const db = {
    world,
    user
}
