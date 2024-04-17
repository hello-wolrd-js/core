import * as mongoose from 'mongoose'

const worldSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

export type WorldSchema = mongoose.InferSchemaType<typeof worldSchema>
export const WorldSchema = mongoose.model('World', worldSchema)
