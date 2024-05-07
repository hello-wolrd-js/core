import { useModal } from '@components/modal/Modal'
import toast from 'solid-toast'

export const useUILib = () => {
    const modal = useModal()
    return {
        modal,
        toast
    }
}
