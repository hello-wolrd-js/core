import { World } from './world'

//所有世界卡片都要有的基本props
export interface WorldCardBaseProps<WorldType = World> {
    world: WorldType
    onToWorld: (world: WorldType) => void
}
