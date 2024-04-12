import { Component } from 'solid-js'
import type { WorldCard } from '../../models/card'
import { render } from 'solid-js/web'
import { useNavigate } from '@solidjs/router'

const Card: Component<WorldCard> = (props) => {
    const navigate = useNavigate()
    const toWorld = () => {
        navigate('/world')
        import(props.link).then((module) => {
            render(() => module.default, document.getElementById('world-container')!)
        })
    }
    return (
        <div class="card w-96 bg-base-100 shadow-lg m-4">
            <figure>
                <img src={props.cover} alt={props.title} />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{props.title}</h2>
                <p>{props.content}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-outline" onClick={toWorld}>
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
