import { WorldCard } from '@/components/card/WorldCard'
import { isSuccessResponse } from '@core/shared'
import { useUserStore } from '@stores/user'
import { Component, For, Show } from 'solid-js'
import toast from 'solid-toast'
import { useEmptyResult, useToWorldFn, useUpdateFavoriteFn } from '@hooks/index'

export const ReleasedView: Component = () => {
    const userStore = useUserStore()
    userStore.getUserReleasedWorlds().then((result) => {
        !isSuccessResponse(result) && toast.error(result.error)
    })

    const handleUpdateFavorite = useUpdateFavoriteFn()
    const handleToWorld = useToWorldFn()

    return (
        <div class="flex justify-evenly flex-wrap h-full overflow-y-auto">
            <Show
                when={userStore.state.released_worlds.list.length}
                fallback={useEmptyResult('暂无发布')}
            >
                <For each={userStore.state.released_worlds.list}>
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
