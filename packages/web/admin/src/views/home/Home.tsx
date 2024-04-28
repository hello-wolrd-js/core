import { Component, createSignal, onCleanup, onMount } from 'solid-js'
import { AdminWorldCard } from '@/components/card/AdminWorldCard'
import type { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Dialog } from '@components/dialog/Dialog'
import toast from 'solid-toast'
import { useEmptyWorldList, useWorldList } from '@hooks/world'
import { WORLD_API } from '@api/world'
import { useAwait } from '@hooks/index'
import { useGlobalStore } from '@stores/global'
import { Search } from '@/components/search/Search'
import { createStore, produce } from 'solid-js/store'

export const HomeView: Component = () => {
    const {
        WorldList,
        handleSearch,
        handleRefresh,
        state,
        setStore: setList
    } = useWorldList({
        async getter(params) {
            console.log(params)
            const result = await WORLD_API.getWorld(params)
            console.log(result)
            //获取失败时才提示
            if (isSuccessResponse(result)) {
                return result.data
            } else {
                toast.error(result.error)
                return useEmptyWorldList()
            }
        },
        refresh: {
            onBeforeRefresh: async () => {
                toast.loading('正在加载更多', { duration: 1000 })
                await useAwait(1000)
            },
            onAllRefreshed: () => {
                toast.success('已经到底啦!')
            }
        }
    })

    //引用当前的世界用户模态框操作
    const [currentWorld, setCurrentWorld] = createSignal<World | null>(null)

    //模态框
    //#region
    const modalSignal = createSignal(false)
    const [showModal, setShowModal] = modalSignal
    const handleOpenModal = async (world: World) => {
        setCurrentWorld(world)
        setShowModal(true)
    }
    const handleDelete = async (target: World) => {
        const result = await WORLD_API.deleteWorld(target.id)
        if (isSuccessResponse(result)) {
            toast.success(result.msg)
            setList(
                produce((state) => {
                    state.list = state.list.filter((w) => w.id !== target.id)
                    state.totalItems--
                })
            )
        } else {
            toast.error(result.error)
        }
    }

    const handleConfirm = async () => {
        const world = currentWorld()
        world && (await handleDelete(world))
    }
    const handleCancel = () => {}
    const handleClose = () => {
        setShowModal(false)
    }
    //#endregion

    //事件
    //#region
    const { emitter, setStore: setGlobal } = useGlobalStore()
    onMount(() => {
        emitter.on('refresh-worlds', async () => {
            await handleRefresh()
            toast.success('刷新成功', { duration: 1000 })
        })
    })
    onCleanup(() => {
        emitter.off('refresh-worlds')
    })

    const handleChecked = async (target: World) => {
        const result = await WORLD_API.checkWorld(target.id)
        if (isSuccessResponse(result)) {
            setList(
                'list',
                (world) => world.id === target.id,
                produce((world) => (world.status = 'checked'))
            )
            toast.success(result.msg)
        } else {
            toast.success(result.error)
        }
    }
    const handleUnchecked = async (target: World) => {
        const result = await WORLD_API.uncheckWorld(target.id)
        if (isSuccessResponse(result)) {
            setList(
                'list',
                (world) => world.id === target.id,
                produce((world) => (world.status = 'unchecked'))
            )
            toast.success(result.msg)
        } else {
            toast.success(result.error)
        }
    }

    //#endregion

    //导航栏拓展
    //#region
    const [query, setQuery] = createStore({
        name: '',
        status: ''
    })

    const NavExtra = (
        <div class="flex justify-center items-center">
            <div class="mx-5">总数: {state.totalItems}</div>
            <Search
                onInput={(name) => {
                    setQuery('name', name)
                    handleSearch(query)
                }}
                debounce={{ wait: 500 }}
                placeholder="搜搜看?"
            />
            <div class="mx-4 flex items-center">
                <span class="mx-2">{query.status === 'checked' ? '已审核' : '待审核'}</span>
                <input
                    type="checkbox"
                    class="toggle"
                    onChange={(e) => {
                        setQuery('status', e.target.checked ? 'checked' : 'unchecked')
                        handleSearch(query)
                    }}
                />
            </div>
        </div>
    )
    setGlobal('nav', 'extra', NavExtra)
    //#endregion

    return (
        <>
            {/* 世界列表 */}
            {WorldList((props) =>
                AdminWorldCard({
                    ...props,
                    onOpenModal: handleOpenModal,
                    onChecked: handleChecked,
                    onUnchecked: handleUnchecked
                })
            )}
            {/* 模态框 */}
            <Dialog
                show={showModal()}
                onClose={handleClose}
                title="确定要删除这个世界吗?"
                content="请君三思"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    )
}
