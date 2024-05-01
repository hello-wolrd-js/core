import { useModal } from '@components/modal/Modal'
import { User } from '@core/models'
import { useUserStore } from '@stores/user'

export const useHWJS = () => {
    const modal = useModal()
    const userStore = useUserStore()
    return {
        //获取当前用户:返回一个用户信息的只读对象proxy
        getUser(): User {
            return userStore.state.user!
        },
        //打开模态框
        openModal(content: string) {
            modal.open(content)
        },
        //关闭模态框
        closeModal() {
            modal.close()
        }
    }
}
