import { connect } from 'mongoose'

const host = process.env['HWJS_MONGODB_HOST']
if (!host) {
    console.error('未配置 HWJS_MONGODB_HOST 环境变量')
    process.exit(1)
}

await connect(`mongodb://${process.env['HWJS_MONGODB_HOST']}/hello-world?authSource=admin`)

import world from './world'
import user from './user'
export const db = {
    world,
    user
}
