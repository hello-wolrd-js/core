import { Component, Show, createMemo } from 'solid-js'
import type { Response, World, WorldCardBaseProps } from '@core/models'
import { useUserStore } from '@stores/user'
import { Star } from '@components/icon/Star'
import { useModal } from '@components/modal/Modal'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { isSuccessResponse } from '@core/shared'

export const WorldCard: Component<
    WorldCardBaseProps & {
        onUpdateFavorite?: (world: World, action: 'add' | 'delete') => Promise<void>
        onDelete?: (id: string) => Promise<Response<World>>
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

    //style
    const style = {
        height: props.height ? `${props.height}px` : void 0,
        width: props.width ? `${props.width}px` : void 0
    }

    //判断是否为作者: 选择性展示一些操作!
    const isAuthor = () => {
        const uid = userStore.state.user?.id
        //这里要分填充和未填充两种情况
        const oid = props.world.owner.id || (props.world.owner as unknown as string)
        return uid === oid
    }

    //删除
    //#region
    const modal = useModal()
    const dialog = Dialog({
        title: '你确定要删除吗',
        async confirm() {
            const result = await props.onDelete!(props.world.id)
            if (isSuccessResponse(result)) {
                toast.success('删除成功')
            } else {
                toast.error('删除失败')
            }
            modal.close()
        },
        cancel() {
            modal.close()
        }
    })
    const handleDelete = () => {
        modal.open(dialog)
    }
    //#endregion

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
                <div class="card-actions justify-end mt-4 flex-nowrap">
                    <button class="btn btn-outline" onClick={() => props.onToWorld(props.world)}>
                        Try
                    </button>
                    <button
                        class={isStared() ? 'btn btn-warning' : 'btn btn-warning btn-outline'}
                        onClick={handleUpdateFavorite}
                    >
                        {isStared() ? '取消收藏' : '收藏'}

                        <Star isStared={isStared()} />
                    </button>

                    {/* 只有作者才能看到 */}
                    <Show when={isAuthor()}>
                        {/* 删除 */}
                        <Show when={props.onDelete}>
                            <button class="btn btn-error btn-outline" onClick={handleDelete}>
                                Delete
                            </button>
                        </Show>
                    </Show>
                </div>
            </div>
        </div>
    )
}
