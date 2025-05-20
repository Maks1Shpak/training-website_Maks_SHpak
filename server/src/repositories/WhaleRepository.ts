import { injectable } from 'inversify';
import { Whale, IWhale } from '../models/whale';

// Клас-репозиторій для роботи з китами
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class WhaleRepository {
    // Метод для отримання всіх китів з бази даних
    public async findAll(): Promise<IWhale[]> {
        return Whale.find();
    }

    // Метод для пошуку кита за унікальним ідентифікатором
    public async findById(id: string): Promise<IWhale | null> {
        return Whale.findById(id);
    }

    // Метод для створення нового кита в базі даних
    public async create(whaleData: IWhale): Promise<IWhale> {
        const whale = new Whale(whaleData);
        return whale.save();
    }

    // Метод для видалення кита за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Whale.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про кита (заміна всіх полів)
    public async update(id: string, whaleData: IWhale): Promise<IWhale | null> {
        return Whale.findByIdAndUpdate(id, whaleData, { new: true });
    }

    // Метод для часткового оновлення даних про кита (оновлення лише вказаних полів)
    public async patch(id: string, whaleData: Partial<IWhale>): Promise<IWhale | null> {
        return Whale.findByIdAndUpdate(id, { $set: whaleData }, { new: true });
    }

    // Всі методи працюють з IWhale, який містить length, а не height
}
