import { Request, Response } from 'express';
import { Whale } from '../models/whale';

// Отримати всіх китів
export const getWhales = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const whales = await Whale.find();
        return res.json(whales);
    } catch (err) {
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Отримати кита за ID
export const getWhaleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const whale = await Whale.findById(req.params.id);
        if (!whale) return res.status(404).json({ message: 'Кита не знайдено' });
        return res.json(whale);
    } catch (err) {
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Створити нового кита
export const createWhale = async (req: Request, res: Response): Promise<Response> => {
    try {
        const whale = new Whale(req.body);
        await whale.save();
        return res.status(201).json(whale);
    } catch (err) {
        return res.status(400).json({ message: 'Некоректні дані' });
    }
};

// Оновити кита повністю
export const updateWhale = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Перетворюємо числові поля, якщо вони прийшли рядком (наприклад, з форми)
        const name = req.body.name;
        const age = typeof req.body.age === 'number' ? req.body.age : Number(req.body.age);
        const length =
            typeof req.body.length === 'number' ? req.body.length : Number(req.body.length);
        const weight =
            typeof req.body.weight === 'number' ? req.body.weight : Number(req.body.weight);
        const gender = req.body.gender;
        const planktonEaten =
            typeof req.body.planktonEaten === 'number'
                ? req.body.planktonEaten
                : Number(req.body.planktonEaten);
        const description = req.body.description;

        // Перевірка наявності всіх обов'язкових полів і що вони не NaN
        if (
            !Boolean(name) ||
            isNaN(age) ||
            isNaN(length) ||
            isNaN(weight) ||
            !Boolean(gender) ||
            isNaN(planktonEaten)
        ) {
            return res
                .status(400)
                .json({ message: "Всі обов'язкові поля мають бути присутні та коректні" });
        }

        const whale = await Whale.findByIdAndUpdate(
            req.params.id,
            { name, age, length, weight, gender, planktonEaten, description },
            { new: true, runValidators: true, overwrite: true },
        );
        if (!whale) return res.status(404).json({ message: 'Кита не знайдено' });
        return res.json(whale);
    } catch (err) {
        return res.status(400).json({ message: 'Некоректні дані' });
    }
};

// Частково оновити кита
export const patchWhale = async (req: Request, res: Response): Promise<Response> => {
    try {
        const whale = await Whale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!whale) return res.status(404).json({ message: 'Кита не знайдено' });
        return res.json(whale);
    } catch (err) {
        return res.status(400).json({ message: 'Некоректні дані' });
    }
};

// Видалити кита
export const deleteWhale = async (req: Request, res: Response): Promise<Response> => {
    try {
        const whale = await Whale.findByIdAndDelete(req.params.id);
        if (!whale) return res.status(404).json({ message: 'Кита не знайдено' });
        return res.json({ message: 'Кита видалено' });
    } catch (err) {
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

// У всіх місцях, де працюєте з китом, використовуйте length, а не height
// Всі методи вже підтримують planktonEaten через IWhale
