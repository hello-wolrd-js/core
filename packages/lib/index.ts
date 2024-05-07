import { World } from '@core/models'
import { useStorageLib } from './storage'
import { useUILib } from './ui'
import { useUserLib } from './user'

export const useHWJS = (world: World) => {
    return {
        ...useUserLib(),
        ...useUILib(),
        ...useStorageLib(world)
    }
}
