import { USER_API } from '@api/user'
import { SimpleUserInfo } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Component, Show, createSignal } from 'solid-js'
import toast from 'solid-toast'

export const UserCard: Component<SimpleUserInfo> = (user) => {
    const [edit, setEdit] = createSignal(false)
    const [avatar, setAvatar] = createSignal(user.avatar)
    const [username, setUsername] = createSignal(user.username)
    const handleEdit = () => setEdit(true)
    const handleCancel = () => {
        setEdit(false)
        setUsername(user.username)
        setAvatar(user.avatar)
    }
    const handleSave = async () => {
        const result = await USER_API.updateUserInfo(user.id, {
            username: username(),
            avatar: avatar()
        })
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
            setEdit(false)
        } else {
            toast.error(result.error)
        }
    }
    return (
        <div class="card w-96 bg-base-100 shadow-xl m-4">
            <figure>
                <img src={avatar()} alt="Shoes" />
            </figure>
            <div class="card-body justify-start">
                <Show when={edit()} fallback={<h2 class="card-title">{username()}</h2>}>
                    <label class="input input-bordered flex items-center gap-2">
                        Username:
                        <input
                            type="text"
                            class="grow"
                            placeholder=".."
                            value={username()}
                            onInput={({ target: { value } }) => setUsername(value)}
                        />
                    </label>
                </Show>
                <p class="text-gray-400">身份: {user.role === 'admin' ? '管理员' : '普通用户'}</p>
                <p class="text-gray-400">id: {user.id}</p>
                <Show when={edit()}>
                    <label class="input input-bordered flex items-center gap-2">
                        Avatar:
                        <input
                            type="text"
                            class="grow"
                            placeholder=".."
                            value={avatar()}
                            onInput={({ target: { value } }) => setAvatar(value)}
                        />
                    </label>
                </Show>
                <div class="divider my-1"></div>
                <div class="card-actions justify-end">
                    <Show
                        when={!edit()}
                        fallback={
                            <>
                                <button class="btn btn-warning" onClick={handleCancel}>
                                    取消
                                </button>
                                <button class="btn btn-error" onClick={handleSave}>
                                    保存
                                </button>
                            </>
                        }
                    >
                        <button class="btn btn-warning" onClick={handleEdit}>
                            编辑
                        </button>
                    </Show>
                </div>
            </div>
        </div>
    )
}
