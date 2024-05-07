import type { User } from '@core/models'
import { useUserStore } from '@stores/user'

export const useUserLib = () => {
    const userStore = useUserStore()
    return {
        //获取当前用户:返回一个用户信息的只读对象proxy
        getUser(): User {
            return userStore.state.user!
        }
    }
}
