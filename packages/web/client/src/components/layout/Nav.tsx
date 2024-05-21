import { useNavigate } from '@solidjs/router'
import { useGlobalStore } from '@stores/global'
import { useUserStore } from '@stores/user'
import { debounce } from 'lodash'
import { useLocation } from '@solidjs/router'
import { DocumentIcon } from '@components/icon/Document'
import { GithubIcon } from '@components/icon/Github'
import { RefreshIcon } from '@components/icon/Refresh'
import { FireIcon } from '@components/icon/Fire'
import { MenuIcon } from '@components/icon/Menu'
import { Component, JSXElement, Show } from 'solid-js'

const NavTrigger: Component<{
    active: string
    tip?: string
    extra?: string
    children: JSXElement
}> = (props) => {
    const location = useLocation()
    const baseClass = ' btn btn-ghost ' + (props.extra || '')
    const dynamicClass = () =>
        location.pathname === props.active ? baseClass + ' btn-active ' : baseClass

    return props.tip ? (
        <div class="tooltip tooltip-bottom" data-tip={props.tip}>
            <div class={dynamicClass()}>{props.children}</div>
        </div>
    ) : (
        <div class={dynamicClass()}>{props.children}</div>
    )
}

export const NavBar: Component<{ height: number }> = (props) => {
    //路由导航
    //#region
    const navigate = useNavigate()
    const handleToHome = () => navigate('/', { replace: true })
    const handleToPublish = () => navigate('/publish')
    const handleToFavorite = () => navigate('/favorite')
    const handleToReleased = () => navigate('/released')
    const handleToHot = () => navigate('/hot')
    const handleToUser = () => navigate('/user')

    //#endregion
    //用户操作: 退出登陆
    //#region
    const userStore = useUserStore()
    const handleLogout = () => {
        userStore.logout()
    }
    //#endregion
    //全局事件: 其实也可以用导航栏插槽来做
    //#region
    const global = useGlobalStore()
    const handleRefreshWorlds = debounce(() => {
        global.emitter.emit('refresh-worlds')
    }, 250)
    //#endregion
    return (
        // 导航栏
        <nav
            class="navbar bg-base-100 shadow-xl fixed z-50 gap-1"
            style={{ height: `${props.height}px` }}
        >
            {/* 下拉菜单 */}
            <div class="flex-none dropdown">
                <div class="tooltip tooltip-bottom" data-tip="更多">
                    <div tabindex="0" role="button" class="btn btn-square btn-ghost m-1">
                        <MenuIcon />
                    </div>
                </div>
                <ul
                    tabindex="0"
                    class="mt-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <a onClick={handleToPublish}>发布</a>
                        <a onClick={handleLogout}>退出登陆</a>
                        {/* 移动端 */}
                        <a class="lg:hidden" onClick={handleToFavorite}>
                            收藏
                        </a>
                        <a class="lg:hidden" onClick={handleToReleased}>
                            已发布
                        </a>
                        <a class="lg:hidden" href="https://hello-world-js.pages.dev/">
                            文档
                        </a>
                        <a class="lg:hidden" href="https://github.com/hello-wolrd-js">
                            github
                        </a>
                    </li>
                </ul>
            </div>
            {/* 主页 */}
            <div class="flex-none" onClick={handleToHome}>
                <NavTrigger active="/" extra="text-xl" tip="主页">
                    Hello-World
                </NavTrigger>
            </div>
            {/* 刷新 */}
            <div class="flex-none" onClick={handleRefreshWorlds}>
                <div class="tooltip tooltip-bottom" data-tip="刷新">
                    <div class="btn btn-ghost btn-square">
                        <RefreshIcon />
                    </div>
                </div>
            </div>
            {/* 查看收藏的 */}
            <div class="flex-none max-sm:hidden" onClick={handleToFavorite}>
                <NavTrigger active="/favorite" tip="我的收藏" extra="btn-square">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                    </svg>
                </NavTrigger>
            </div>
            {/* 查看发布的 */}
            <div class="flex-none max-sm:hidden" onClick={handleToReleased}>
                <NavTrigger active="/released" tip="我的发布" extra="btn-square">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                </NavTrigger>
            </div>
            {/* 查看热门 */}
            <div class="flex-none max-sm:hidden" onClick={handleToHot}>
                <NavTrigger active="/hot" tip="热门" extra="btn-square">
                    <FireIcon />
                </NavTrigger>
            </div>
            {/* 导航栏拓展 */}
            <div class="flex-1 justify-center max-md:hidden">{global.state.nav.extra}</div>
            {/* 用户头像 */}
            <div class="flex-none" onClick={handleToUser}>
                <NavTrigger active="/user" extra="btn-square">
                    <Show
                        when={userStore.state.user?.avatar}
                        fallback={
                            <div class="avatar placeholder">
                                <div class="bg-neutral text-neutral-content rounded w-9">
                                    {/* 只展示前两个字符 */}
                                    <span>{userStore.state.user?.username.slice(0, 2)}</span>
                                </div>
                            </div>
                        }
                    >
                        <div class="avatar">
                            <div class="w-9 rounded">
                                <img src={userStore.state.user?.avatar} />
                            </div>
                        </div>
                    </Show>
                </NavTrigger>
            </div>
            {/* 文档 */}
            <div class="flex-none max-lg:hidden">
                <a class="btn btn-square btn-ghost" href="https://hello-world-js.pages.dev/">
                    <DocumentIcon />
                </a>
            </div>
            {/* github */}
            <div class="flex-none max-lg:hidden">
                <a class="btn btn-square btn-ghost" href="https://github.com/hello-wolrd-js">
                    <GithubIcon />
                </a>
            </div>
        </nav>
    )
}
