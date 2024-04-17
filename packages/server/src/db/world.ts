import { WorldSchema } from './schema'

export const createWorld = async (name: string) => {
    const world = new WorldSchema({
        name
    })
    await world.save()
}
