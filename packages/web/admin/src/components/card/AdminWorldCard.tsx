import { Show, type Component } from 'solid-js'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import toast from 'solid-toast'
import { useWorldStore } from '@stores/world'

export const AdminWorldCard: Component<{
    onOpenModal: (world: World) => void
    onToWorld: (world: World) => void
    world: World
}> = (props) => {
    const worldStore = useWorldStore()
    const handleToWorld = () => {
        props.onToWorld(props.world)
    }
    const handleDelete = () => {
        props.onOpenModal(props.world)
    }
    const handleCheck = async () => {
        const result = await worldStore.checkWorld(props.world.id)
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }
    const handleUncheck = async () => {
        const result = await worldStore.uncheckWorld(props.world.id)
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
        } else {
            toast.error(result.error)
        }
    }

    return (
        <div class="card w-96 h-3/4 bg-base-100 shadow-lg m-4">
            <figure>
                {props.world.cover && <img src={props.world.cover} alt={props.world.name} />}
            </figure>

            <div class="card-body">
                <h2 class="card-title">{props.world.name}</h2>
                <p>{props.world.description}</p>
                <div class="divider mt-0 mb-0 text-gray-600/50"></div>
                {/* 统计 */}
                <div class="stat p-0">
                    <div class="stat-figure text-secondary"></div>
                    <div class="stat-title">审核状态</div>
                    <div class="stat-value">
                        {props.world.status === 'checked' ? '已通过' : '待审核'}
                    </div>
                </div>
                {/* 交互栏 */}
                <div class="card-actions gap-0 justify-end mt-4 join">
                    <button class="btn join-item" onClick={handleToWorld}>
                        Try
                    </button>
                    <Show
                        when={props.world.status === 'checked'}
                        fallback={
                            <button class="btn btn-warning join-item" onClick={handleCheck}>
                                Check
                            </button>
                        }
                    >
                        <button class="btn btn-warning  join-item" onClick={handleUncheck}>
                            Uncheck
                        </button>
                    </Show>
                    <button class="btn btn-error join-item" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
