import {
    World,
    WorldCreateParams,
    WorldList,
    WorldQueryParams,
    WorldUpdateParams
} from '@core/models'
import { WorldModel } from './schema/world'
import { Types } from 'mongoose'
import { UserModel } from './schema/user'

//敏感字段

//基本的增删改查
//#region

//创建世界
export const createWorld = async (world: WorldCreateParams, userId: string) => {
    //先查找是否存在同名世界
    if (await WorldModel.findOne({ name: world.name })) {
        throw '存在同名世界'
    }

    //创建新世界
    const newWorld = new WorldModel({
        ...world,
        star: 0,
        status: 'unchecked',
        owner: new Types.ObjectId(userId)
    })
    await newWorld.save()

    //更新用户发布列表
    const user = await UserModel.findById(userId)
    if (!user) throw '该用户不存在!'
    user.released_worlds.push(newWorld._id)
    await user.save()

    return newWorld
}

//获取世界
export const getWorld = async (
    params?: Omit<WorldQueryParams, 'page' | 'pageSize' | 'status'> & {
        page?: string
        pageSize?: string
    }
): Promise<WorldList> => {
    const filter = {
        ...params,
        name: new RegExp(params?.name || ''),
        page: void 0, //这里要shadow掉分页参数
        pageSize: void 0
    }
    const page = parseInt(params?.page || '1') || 1
    const pageSize = parseInt(params?.pageSize || '10') || 10
    const query = WorldModel.find(filter)
    const totalItems = await query.clone().countDocuments()
    const totalPages = Math.ceil(totalItems / pageSize)
    const list = await query
        .clone()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('owner', 'id username role')
    return {
        list,
        totalItems,
        totalPages
    }
}

//获取最多star的世界
export const getMostStarWorld = async (limit: number): Promise<World[]> => {
    const worlds = await WorldModel.find().sort({ star: -1 }).limit(limit)
    return worlds
}

//删除世界
export const deleteWorld = async (id: string) => {
    return await WorldModel.deleteOne({ _id: id })
}

//更新世界
export const updateWorld = async (id: string, world: WorldUpdateParams) => {
    return await WorldModel.findByIdAndUpdate(id, world)
}

//#endregion

//修改世界状态: 已审核,未审核,被举报
export const updateWorldStatus = async (id: string, status: World['status']) => {
    const world = await WorldModel.findById(id)
    if (!world) throw '无效世界id'
    world.status = status
    return await world.save()
}

export default {
    createWorld,
    getWorld,
    deleteWorld,
    updateWorld,
    getMostStarWorld,
    updateWorldStatus
}
