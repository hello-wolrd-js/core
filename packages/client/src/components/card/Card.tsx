import { Component } from 'solid-js'
import type { WorldCard } from '../../models/card'

const Card: Component<WorldCard> = (props) => {
    return (
        <div class="card w-96 bg-base-100 shadow-xl m-4">
            <figure>
                <img src={props.cover} alt={props.title} />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{props.title}</h2>
                <p>{props.content}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-outline">进入</button>
                </div>
            </div>
        </div>
    )
}

export default Card
