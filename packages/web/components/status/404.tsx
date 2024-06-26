import { useNavigate } from '@solidjs/router'
import { Component } from 'solid-js'

export const NotFound: Component = () => {
    const navigate = useNavigate()
    return (
        <div class="hero h-full bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">404 Not Found</h1>
                </div>
            </div>
        </div>
    )
}
