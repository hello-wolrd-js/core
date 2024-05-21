import { useUserStore } from '@stores/user'
import { Component } from 'solid-js'

export const UserView: Component = () => {
    const userStore = useUserStore()
    return (
        <div class="h-full flex justify-center gap-20 items-center">
            <section class="w-1/4 h-3/4 flex flex-col gap-2">
                <img src={userStore.state.user?.avatar} class="w-3/4 rounded" />
                <div class="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type here"
                        value={userStore.state.user?.avatar}
                        class="input input-bordered w-3/4"
                    />
                    <button class="btn btn-outline">保存</button>
                </div>

                <div class="mt-4 text-3xl font-bold">{userStore.state.user?.username}</div>
                <div class=" text-gray-400">
                    {userStore.state.user?.role === 'common' ? '普通用户' : '管理员'}
                </div>
            </section>
            <div class="divider divider-horizontal"></div>
            <section class="w-1/4 h-3/4"></section>
        </div>
    )
}
