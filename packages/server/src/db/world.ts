import {
    World,
    WorldCreateParams,
    WorldList,
    WorldQueryParams,
    WorldUpdateParams
} from '@core/models'
import { WorldModel } from './schemas/world'
import { Types } from 'mongoose'
import { UserModel } from './schemas/user'

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
export const getWorld = async (params?: Omit<WorldQueryParams, 'status'>): Promise<WorldList> => {
    const filter = {
        ...params,
        name: new RegExp(params?.name || ''),
        page: void 0, //这里要shadow掉分页参数
        pageSize: void 0
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
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
export const deleteWorld = async (worldId: string, userId: string) => {
    //删除world集合中的
    const world = await WorldModel.findById({ _id: worldId }).populate('owner', 'id username role')
    if (!world) throw '无效世界id'

    //二级鉴权
    if (world.owner.id !== userId && world.owner.role !== 'admin') throw '目标用户非发布者,无权删除'

    //更新用户released
    const user = await UserModel.findById(userId)
    if (!user) throw '无效用户id'

    user.released_worlds = user.released_worlds.filter((w) => w.toString() !== worldId)
    user.favorite_worlds = user.favorite_worlds.filter((w) => w.toString() !== worldId)
    await user.save()
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
