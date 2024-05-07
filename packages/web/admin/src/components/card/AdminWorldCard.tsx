import { type Component } from 'solid-js'
import type { World, WorldCardBaseProps } from '@core/models'
import { useModal } from '@components/modal/Modal'
import { Dialog } from '@components/dialog/Dialog'

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
    const handleOpenModal = () => {
        open(Dialog({ confirm: handleDelete, cancel: close, title: '你确定要删除吗?' }))
    }

    const statusMap: Record<World['status'], string> = {
        checked: '已审核',
        unchecked: '未审核',
        reported: '被举报'
    }
    const worldStatus = () => statusMap[props.world.status]

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
                    <div class="stat-value">{worldStatus()}</div>
                </div>
                {/* 交互栏 */}
                <div class="card-actions gap-0 justify-end mt-4 join">
                    <button class="btn join-item" onClick={handleToWorld}>
                        Try
                    </button>
                    <button
                        class="btn btn-warning join-item"
                        onClick={() => {
                            props.world.status === 'checked'
                                ? props.onUnchecked(props.world)
                                : props.onChecked(props.world)
                        }}
                    >
                        {props.world.status === 'checked' ? 'uncheck' : 'check'}
                    </button>
                    <button class="btn btn-error join-item" onClick={handleOpenModal}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
