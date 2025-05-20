import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Кит"
interface IWhale {
    name: string; // Ім'я кита
    age: number; // Вік кита у роках
    length: number; // Довжина кита в сантиметрах
    weight: number; // Вага кита в кілограмах
    gender: 'male' | 'female'; // Стать кита: 'male' - самець, 'female' - самка
    description?: string; // Опис кита (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
    planktonEaten: number; // Кількість з'їденого планктону (кг)
}

// Схема MongoDB для моделі "Кит"
const whaleSchema = new Schema<IWhale>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    length: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    description: String,
    dateAdded: { type: Date, default: Date.now },
    planktonEaten: { type: Number, required: true, default: 0 },
});

export const Whale = model<IWhale>('Whale', whaleSchema);
export type { IWhale };
export {}; // Додає визначення модуля для TypeScript
