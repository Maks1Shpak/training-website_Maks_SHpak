import { Schema, model, Document } from 'mongoose';

export interface IWhale extends Document {
    name: string;
    age: number;
    length: number;
    weight: number;
    gender: string;
    planktonEaten: number;
    description?: string;
    dateAdded: Date; // ДОДАНО
}

const WhaleSchema = new Schema<IWhale>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    length: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true },
    planktonEaten: { type: Number, required: true },
    description: { type: String, default: '' },
    dateAdded: { type: Date, default: Date.now }, // ДОДАНО
});

export const Whale = model<IWhale>('Whale', WhaleSchema);
