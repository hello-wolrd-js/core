import { World } from '@core/models'

const check = (key: string) => {
    if (key === 'token') return false
    else return true
}

const createStorage = (storage: Storage, flag: string) => {
    return {
        getItem(key: string): null | string {
            //限制某些敏感信息的访问
            if (!check(key)) return null

            //拿到存储单元
            const unitStr = storage.getItem(flag)
            if (!unitStr) return null

            const unit: Record<string, string> = JSON.parse(unitStr)
            return unit[key]
        },
        setItem(key: string, content: string): null | string {
            //限制某些敏感信息的访问
            if (!check(key)) return null

            //拿到存储单元
            const unitStr = storage.getItem(flag)
            const unit: Record<string, string> = unitStr ? JSON.parse(unitStr) : {}

            unit[key] = content
            storage.setItem(flag, JSON.stringify(unit))
            return content
        }
    }
}

export const useStorageLib = (world: World) => {
    const worldFlag = 'world-' + world.id
    return {
        localStorage: createStorage(localStorage, worldFlag),
        sessionStorage: createStorage(sessionStorage, worldFlag)
    }
}
