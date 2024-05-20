import { useNavigate } from '@solidjs/router'
import { useGlobalStore } from '@stores/global'
import { useUserStore } from '@stores/user'
import { debounce } from 'lodash'
import { useLocation } from '@solidjs/router'
import { Component, JSXElement } from 'solid-js'

const NavTrigger: Component<{
    active: string
    tip: string
    extra?: string
    children: JSXElement
}> = (props) => {
    const location = useLocation()
    const baseClass = 'btn btn-ghost ' + (props.extra || '')
    const dynamicClass = () =>
        location.pathname === props.active ? baseClass + ' btn-active ' : baseClass

    return (
        <div class="tooltip tooltip-bottom" data-tip={props.tip}>
            <div class={dynamicClass()}>{props.children}</div>
        </div>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
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
                    <div class="btn btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width={1.5}
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            {/* 查看收藏的 */}
            <div class="flex-none max-sm:hidden" onClick={handleToFavorite}>
                <NavTrigger active="/favorite" tip="我的收藏">
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
                <NavTrigger active="/released" tip="我的发布">
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
                <NavTrigger active="/hot" tip="热门">
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
                            d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                        />
                    </svg>
                </NavTrigger>
            </div>
            {/* 导航栏拓展 */}
            <div class="flex-1 justify-center max-md:hidden">{global.state.nav.extra}</div>
            {/* 文档 */}
            <div class="flex-none max-lg:hidden">
                <a class="btn btn-square btn-ghost" href="https://hello-world-js.pages.dev/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                </a>
            </div>
            {/* github */}
            <div class="flex-none max-lg:hidden">
                <a class="btn btn-square btn-ghost" href="https://github.com/hello-wolrd-js">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="github"
                        class="w-8 h-8"
                    >
                        <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
                    </svg>
                </a>
            </div>
        </nav>
    )
}
