import { debounce } from 'lodash'
import { Component } from 'solid-js'

export const Search: Component<{
    onInput: (value: string) => any
    debounce?: {
        wait: number
    }
    placeholder?: string
}> = (props) => {
    const _handleInput = (e: InputEvent) => {
        props.onInput((e.target as HTMLInputElement).value)
    }
    const handleInput = props.debounce ? debounce(_handleInput, props.debounce.wait) : _handleInput
    return (
        <label class="input input-bordered flex items-center gap-2 input-sm ">
            <input type="text" class="grow" placeholder={props.placeholder} onInput={handleInput} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
            >
                <path
                    fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd"
                />
            </svg>
        </label>
    )
}
