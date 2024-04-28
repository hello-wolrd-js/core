import { Show, type Component } from 'solid-js'
import type { World, WorldCardBaseProps } from '@core/models'
import { useModal } from '@components/modal/Modal'

export const AdminWorldCard: Component<
    {
        onChecked: (target: World) => void
        onUnchecked: (target: World) => void
        onDeleted: (target: World) => void
    } & WorldCardBaseProps
> = (props) => {
    const handleToWorld = () => {
        props.onToWorld(props.world)
    }
    const handleDelete = () => {
        props.onDeleted(props.world)
        close()
    }

    const { open, close } = useModal()
    const dialog = (
        <div class="card-body p-0">
            <h2 class="card-title">你确定要删除这个卡片吗</h2>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" onClick={handleDelete}>
                    确认
                </button>
                <button class="btn btn-error" onClick={close}>
                    取消
                </button>
            </div>
        </div>
    )

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
                            <button
                                class="btn btn-warning join-item"
                                onClick={() => props.onChecked(props.world)}
                            >
                                Check
                            </button>
                        }
                    >
                        <button
                            class="btn btn-warning  join-item"
                            onClick={() => props.onUnchecked(props.world)}
                        >
                            Uncheck
                        </button>
                    </Show>
                    <button class="btn btn-error join-item" onClick={() => open(dialog)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
