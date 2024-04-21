import { useNavigate } from '@solidjs/router'
import { Component } from 'solid-js'

const NavBar: Component<{ height: number }> = (props) => {
    const navigate = useNavigate()
    const toHome = () => navigate('/', { replace: true })
    const toPublish = () => navigate('/publish')
    return (
        <nav
            class="navbar bg-base-100 shadow-xl fixed z-50"
            style={{ height: `${props.height}px` }}
        >
            <div class="flex-none">
                {/* 下拉菜单 */}
                <div class="dropdown">
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
                    <ul
                        tabindex="0"
                        class="mt-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a onClick={toPublish}>
                                发布
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* 标题 */}
            <div class="flex-1">
                <a class="btn btn-ghost text-xl" onClick={toHome}>
                    Hello-World
                </a>
            </div>
            <div class="flex-none">
                <a class="btn btn-square btn-ghost" href="https://github.com/hello-wolrd-js">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        id="github"
                    >
                        <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
                    </svg>
                </a>
            </div>
        </nav>
    )
}

export default NavBar
