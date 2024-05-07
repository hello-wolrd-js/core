import { Component, createMemo } from 'solid-js'
import type { World, WorldCardBaseProps } from '@core/models'
import { useUserStore } from '@stores/user'
import { Star } from '@components/icon/Star'

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
                    <button
                        class={isStared() ? 'btn btn-warning' : 'btn btn-outline'}
                        onClick={handleUpdateFavorite}
                    >
                        {isStared() ? '取消收藏' : '收藏'}

                        <Star isStared={isStared()} />
                    </button>
                    <button class="btn btn-outline" onClick={() => props.onToWorld(props.world)}>
                        Try
                    </button>
                </div>
            </div>
        </div>
    )
}
