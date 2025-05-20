import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Whale } from '../src/models/whale';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про китів
describe('API вебдодатку сайту про китів', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/whales-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "whales-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію китів
    beforeEach(async () => {
        await Whale.deleteMany({});
    });

    // Тести для створення запису про нового кита (POST-запит)
    describe('POST /api/whales', () => {
        it('має створити запис про нового кита', done => {
            // Тестові дані кита
            const whale = {
                name: 'Синій',
                age: 25,
                length: 30,
                weight: 120000,
                gender: 'male' as const,
                description: 'Найбільший кит у світі',
            };

            // Виконуємо POST-запит для створення запису про кита
            chai.request(app)
                .post('/api/whales')
                .send(whale)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', whale.name);
                    expect(res.body).to.have.property('age', whale.age);
                    expect(res.body).to.have.property('length', whale.length);
                    expect(res.body).to.have.property('weight', whale.weight);
                    expect(res.body).to.have.property('gender', whale.gender);
                    expect(res.body).to.have.property('description', whale.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів китів (GET-запит)
    describe('GET /api/whales', () => {
        it('має отримати всіх китів', async () => {
            // Створюємо тестовий запис кита
            const testWhale = new Whale({
                name: 'Горбач',
                age: 50,
                length: 15,
                weight: 40000,
                gender: 'female',
                description: 'Кит з горбатою спиною',
            });
            await testWhale.save();

            // Виконуємо GET-запит для отримання всіх записів китів
            const res = await chai.request(app).get('/api/whales');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Горбач');
            expect(res.body[0]).to.have.property('gender', 'female');
            expect(res.body[0]).to.have.property('description', 'Кит з горбатою спиною');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретного кита за ID (GET-запит)
    describe('GET /api/whales/:id', () => {
        it('має отримати конкретного кита за id', async () => {
            // Створюємо запис тестового кита
            const testWhale = new Whale({
                name: 'Кашалот',
                age: 70,
                length: 18,
                weight: 57000,
                gender: 'male',
                description: 'Кит з великою головою',
            });
            const savedWhale = await testWhale.save();

            // Виконуємо GET-запит для отримання запису кита за ID
            const res = await chai.request(app).get(`/api/whales/${String(savedWhale._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Кашалот');
            expect(res.body).to.have.property('age', 70);
            expect(res.body).to.have.property('length', 18);
            expect(res.body).to.have.property('weight', 57000);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Кит з великою головою');
        });

        it('має повернути 404 для неіснуючого кита', async () => {
            // Виконуємо GET-запит для неіснуючого ID кита
            const res = await chai.request(app).get('/api/whales/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про кита (PUT-запит)
    describe('PUT /api/whales/:id', () => {
        it('має повністю оновити запис про кита', async () => {
            // Створюємо тестового кита
            const testWhale = new Whale({
                name: 'Оригінальний',
                age: 20,
                length: 25,
                weight: 50000,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedWhale = await testWhale.save();

            // Дані для оновлення кита
            const updatedData = {
                name: 'Оновлений',
                age: 25,
                length: 30,
                weight: 120000,
                gender: 'female',
                description: 'Оновлений опис',
            };

            // Виконуємо PUT-запит для повного оновлення запису про кита
            const res = await chai
                .request(app)
                .put(`/api/whales/${String(savedWhale._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 25);
            expect(res.body).to.have.property('length', 30);
            expect(res.body).to.have.property('weight', 120000);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестового кита
            const testWhale = new Whale({
                name: 'Оригінальний',
                age: 20,
                length: 25,
                weight: 50000,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedWhale = await testWhale.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 25,
                // length і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/whales/${String(savedWhale._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що кит не змінився
            const unchangedWhale = await Whale.findById(savedWhale._id);
            expect(unchangedWhale).to.have.property('name', 'Оригінальний');
            expect(unchangedWhale).to.have.property('length', 25);
            expect(unchangedWhale).to.have.property('weight', 50000);
        });
    });

    // Тести для часткового оновлення запису про кита (PATCH-запит)
    describe('PATCH /api/whales/:id', () => {
        it('має частково оновити запис про кита', async () => {
            // Створюємо тестового кита
            const testWhale = new Whale({
                name: 'Оригінальний',
                age: 20,
                length: 25,
                weight: 50000,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedWhale = await testWhale.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 30,
                description: 'Оновлений опис',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/whales/${String(savedWhale._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 30);
            expect(res.body).to.have.property('length', 25);
            expect(res.body).to.have.property('weight', 50000);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестового кита
            const testWhale = new Whale({
                name: 'Оригінальний',
                age: 20,
                length: 25,
                weight: 50000,
                gender: 'male',
                description: 'Початковий опис',
            });
            const savedWhale = await testWhale.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 25,
                // length і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/whales/${String(savedWhale._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 25);
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('length', 25);
            expect(res.body).to.have.property('weight', 50000);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/whales', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/whales')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису кита (DELETE-запит)
    describe('DELETE /api/whales/:id', () => {
        it('має видалити запис про кита', async () => {
            // Створюємо тестового кита
            const testWhale = new Whale({
                name: 'Горбач',
                age: 50,
                length: 15,
                weight: 40000,
                gender: 'female',
                description: 'Кит з горбатою спиною',
            });
            const savedWhale = await testWhale.save();

            // Виконуємо DELETE-запит
            const res = await chai.request(app).delete(`/api/whales/${String(savedWhale._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про кита видалено');

            // Перевіряємо, що запис про кита дійсно видалено з бази
            const findWhale = await Whale.findById(savedWhale._id);
            expect(findWhale).to.be.null;
        });
    });
});
