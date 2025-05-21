import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { WhaleRepository } from '../repositories/WhaleRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію китів з контейнера інверсії залежностей
const whaleRepository = container.get(WhaleRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів китів
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи китів з бази даних через репозиторій
        const whales = await whaleRepository.findAll();
        res.json(whales);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного кита за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук кита за ідентифікатором
        const whale = await whaleRepository.findById(req.params.id);
        if (whale) {
            res.json(whale);
        } else {
            // Якщо кит не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис кита не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису кита
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис кита з даних запиту
        const newWhale = await whaleRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного кита
        res.status(201).json(newWhale);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису кита
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'length', 'weight', 'gender', 'planktonEaten'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо кита з вказаним ID
        const whale = await whaleRepository.update(req.params.id, req.body);
        if (whale) {
            return res.json(whale);
        } else {
            // Якщо кит не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис кита не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        // Виправлено: завжди повертати 500 для неочікуваних помилок
        return res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису кита
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису кита - передаються лише ті поля, які потрібно змінити
        const whale = await whaleRepository.patch(req.params.id, req.body);
        if (whale) {
            res.json(whale);
        } else {
            // Якщо кит не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис кита не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису кита
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про кита за ID
        const whale = await whaleRepository.delete(req.params.id);
        if (whale) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про кита видалено' });
        } else {
            // Якщо кит не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про кита не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
