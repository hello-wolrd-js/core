import { useUserStore } from '@stores/user'
import { Component, For, Show } from 'solid-js'
import { WorldCard } from '../../components/card/WorldCard'
import { isSuccessResponse } from '@core/shared/guard'
import toast from 'solid-toast'
import { useEmptyResult, useToWorldFn, useUpdateFavoriteFn } from '@hooks/index'

export const FavoriteView: Component = () => {
    const userStore = useUserStore()
    userStore.getUserFavoriteWorlds().then((result) => {
        !isSuccessResponse(result) && toast.error(result.error)
    })

    const handleUpdateFavorite = useUpdateFavoriteFn()
    const handleToWorld = useToWorldFn()

    return (
        <div class="flex justify-evenly flex-wrap h-full overflow-y-auto">
            <Show
                when={userStore.state.favorite_worlds.list.length}
                fallback={useEmptyResult('暂无收藏')}
            >
                <For each={userStore.state.favorite_worlds.list}>
                    {(world) => (
                        <WorldCard
                            world={world}
                            onUpdateFavorite={handleUpdateFavorite}
                            onToWorld={handleToWorld}
                        ></WorldCard>
                    )}
                </For>
            </Show>
        </div>
    )
}
