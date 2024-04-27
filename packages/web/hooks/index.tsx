import { World, WorldList } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { useNavigate } from '@solidjs/router'
import { useGlobalStore } from '@stores/global'
import { useUserStore } from '@stores/user'
import { SetStoreFunction, produce } from 'solid-js/store'
import { JSX } from 'solid-js/web/types/jsx'
import toast from 'solid-toast'

const defaultEmptyResultContent = (
    <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
    </p>
)
export const useEmptyResult = (
    title: JSX.Element,
    content: JSX.Element = defaultEmptyResultContent
) => {
    return (
        <div class="hero bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">{title}</h1>
                    {content}
                </div>
            </div>
        </div>
    )
}

export const useToWorldFn = () => {
    const navigate = useNavigate()
    return (world: World) => {
        navigate('/world')
        useGlobalStore().setStore('currentWorld', world)
    }
}

export const useUpdateUserFavoriteFn = (setter: SetStoreFunction<WorldList>) => {
    const userStore = useUserStore()
    return async (world: World, action: 'add' | 'delete') => {
        const result =
            action === 'add'
                ? await userStore.addUserFavoriteWorld(world)
                : await userStore.deleteUserFavoriteWorld(world)
        if (isSuccessResponse(result)) {
            setter(
                'list',
                (w) => w.id === world.id,
                produce((world) => (action === 'add' ? world.star++ : world.star--))
            )
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
}

export const useAwait = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1)
        }, duration)
    })
}
