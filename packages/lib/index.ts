import { useModal } from '@components/modal/Modal'
import { User } from '@core/models'
import { useUserStore } from '@stores/user'
import toast from 'solid-toast'

export const useHWJS = () => {
    const modal = useModal()
    const userStore = useUserStore()
    return {
        //获取当前用户:返回一个用户信息的只读对象proxy
        getUser(): User {
            return userStore.state.user!
        },
        modal,
        //消息条
        toast
    }
}
