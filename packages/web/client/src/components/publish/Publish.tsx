import { WORLD_API } from '@api/world'
import { World } from '@core/models'
import { isSuccessResponse } from '@core/shared'
import { Component, createSignal } from 'solid-js'
import toast from 'solid-toast'

export const Publish: Component = () => {
    const origin: Omit<World, 'id' | 'star' | 'checked' | 'owner'> = {
        name: '',
        description: '',
        url: '',
        cover: ''
    }
    const [world, setWorld] = createSignal({ ...origin })
    const handlePublish = async () => {
        //校验
        if (!world().name) {
            return toast.error('世界名称不能为空')
        }
        if (!world().description) {
            return toast.error('世界描述不能为空')
        }
        if (!world().url) {
            return toast.error('世界url不能为空')
        }

        try {
            const result = await WORLD_API.createWorld({ ...world() })
            if (isSuccessResponse(result)) {
                toast.success(result.msg)
            } else {
                toast.error(result.error)
            }
        } catch (error) {
            toast.error('创建失败!')
            console.error(error)
        }
    }
    const handleReset = () => setWorld({ ...origin })
    const handleInput = (k: keyof typeof origin, v: string) => {
        setWorld((w) => {
            const _w = { ...w }
            _w[k] = v
            return _w
        })
    }

    return (
        <div class="flex flex-col-reverse justify-around items-center h-full lg:flex-row">
            {/* 基本信息表单 */}
            <div class="card shrink-0 min-w-96 shadow-2xl min-h-2/3 bg-base-50">
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">名称</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            class="input input-bordered"
                            value={world().name}
                            onInput={(e) => handleInput('name', e.target.value)}
                            required
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">描述</span>
                        </label>
                        <textarea
                            class="textarea textarea-bordered"
                            placeholder="description"
                            required
                            value={world().description}
                            onInput={(e) => handleInput('description', e.target.value)}
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">卡片封面(可选)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="cover"
                            class="input input-bordered"
                            required
                            value={world().cover}
                            onInput={(e) => handleInput('cover', e.target.value)}
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">文件url(.mjs)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="url"
                            class="input input-bordered"
                            required
                            value={world().url}
                            onInput={(e) => handleInput('url', e.target.value)}
                        />
                    </div>
                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <button class="btn " onClick={handlePublish}>
                            发布
                        </button>
                        <button class="btn btn-warning" onClick={handleReset}>
                            重置
                        </button>
                    </div>
                </div>
            </div>

            {/* 卡片 */}
            <div class="card w-96 shadow-xl h-2/3">
                <figure>
                    <img src={world().cover} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{world().name}</h2>
                    <p>{world().description}</p>
                    {/* <div class="card-actions justify-end">
                        {world().url && <button class="btn">Try</button>}
                    </div> */}
                </div>
            </div>
        </div>
    )
}
