import { Component, createMemo } from 'solid-js'
import type { World, WorldCardBaseProps } from '@core/models'
import { useUserStore } from '@stores/user'

export const WorldCard: Component<
    WorldCardBaseProps & {
        onUpdateFavorite?: (world: World, action: 'add' | 'delete') => Promise<void>
    }
> = (props) => {
    const userStore = useUserStore()

    //Star逻辑
    //#region
    const isStared = createMemo(() => {
        return userStore.state.user!.favorite_worlds.includes(props.world.id)
    })
    const handleUpdateFavorite = () => {
        props.onUpdateFavorite?.(props.world, isStared() ? 'delete' : 'add')
    }
    //#endregion

    const style = {
        height: props.height ? `${props.height}px` : void 0,
        width: props.width ? `${props.width}px` : void 0
    }

    return (
        <div class="card w-96 h-3/4 bg-base-100 shadow-lg m-4" style={style}>
            <figure>
                {props.world.cover && <img src={props.world.cover} alt={props.world.name} />}
            </figure>
            <div class="card-body">
                <h2 class="card-title">{props.world.name}</h2>
                <p>{props.world.description}</p>
                <div class="divider mt-0 mb-0 text-gray-600/50"></div>
                {/* 统计 */}
                <div class=" stat p-0">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">Total star</div>
                    <div class="stat-value">{props.world.star}</div>
                </div>
                {/* 交互栏 */}
                <div class="card-actions justify-end mt-4">
                    <button class="btn btn-outline" onClick={handleUpdateFavorite}>
                        {isStared() ? '取消收藏' : '收藏'}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                    </button>
                    <button class="btn btn-outline" onClick={() => props.onToWorld(props.world)}>
                        Try
                    </button>
                </div>
            </div>
        </div>
    )
}
