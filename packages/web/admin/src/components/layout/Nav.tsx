import { useNavigate } from '@solidjs/router'
import { Component } from 'solid-js'
import { useUserStore } from '@stores/user'
import { useGlobalStore } from '@stores/global'
import { DocumentIcon } from '@components/icon/Document'
import { GithubIcon } from '@components/icon/Github'
import { RefreshIcon } from '@components/icon/Refresh'
import { UsersIcon } from '@components/icon/User'
import { MenuIcon } from '@components/icon/Menu'
import { debounce } from 'lodash'

export const NavBar: Component<{ height: number }> = (props) => {
    //导航
    const navigate = useNavigate()
    const handleToHomeView = () => navigate('/', { replace: true })
    const handleToUserView = () => navigate('/user', { replace: true })

    //用户
    const userStore = useUserStore()
    const handleLogout = () => {
        userStore.logout()
    }

    //跨组件事件
    const { state, emitter } = useGlobalStore()
    const handleRefreshWorlds = debounce(() => {
        emitter.emit('refresh-worlds')
    }, 250)

    return (
        <nav
            class="navbar bg-base-100 shadow-xl fixed z-50 gap-1"
            style={{ height: `${props.height}px` }}
        >
            {/* 下拉菜单 */}
            <div class="flex-none">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-square btn-ghost">
                        <MenuIcon />
                    </div>
                    <ul
                        tabindex="0"
                        class="mt-3 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a onClick={handleLogout}>退出登陆</a>
                            {/* 移动端 */}
                            <a class="lg:hidden" href="https://hello-world-js.pages.dev/">
                                文档
                            </a>
                            <a class="lg:hidden" href="https://github.com/hello-wolrd-js">
                                github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 标题 */}
            <div class="flex-none">
                <a class="btn btn-ghost text-xl" onClick={handleToHomeView}>
                    Hello-World-Admin
                </a>
            </div>
            {/* 刷新世界 */}
            <div class="flex-none">
                <a class="btn btn-square btn-ghost" onClick={handleRefreshWorlds}>
                    <RefreshIcon />
                </a>
            </div>
            {/* 用户审核列表 */}
            <div class="flex-none">
                <a class="btn btn-square btn-ghost" onClick={handleToUserView}>
                    <UsersIcon />
                </a>
            </div>
            {/* 导航栏拓展 */}
            <div class="flex-1 justify-center">{state.nav.extra} </div>
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
