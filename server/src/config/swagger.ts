// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Китів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Китів',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/whales': {
            // GET запит для отримання всіх китів
            get: {
                summary: 'Отримати всіх китів',
                responses: {
                    '200': {
                        description: 'Список всіх китів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Whale' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового кита
            post: {
                summary: 'Створити нового кита',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Whale' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт кита",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Whale' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного кита за ID
        '/api/whales/{id}': {
            // GET запит для отримання кита за ID
            get: {
                summary: 'Отримати кита за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID кита',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт кита",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Whale' },
                            },
                        },
                    },
                    '404': { description: 'Кита не знайдено' },
                },
            },

            // PUT запит для повного оновлення кита за ID
            put: {
                summary: 'Повністю оновити кита',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID кита',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Whale' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт кита",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Whale' },
                            },
                        },
                    },
                    '404': { description: 'Кита не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення кита за ID
            patch: {
                summary: 'Частково оновити кита',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID кита',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Whale' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт кита",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Whale' },
                            },
                        },
                    },
                    '404': { description: 'Кита не знайдено' },
                },
            },
            // DELETE запит для видалення даних про кита за ID
            delete: {
                summary: 'Видалити дані про кита',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID кита',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Кита не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        schemas: {
            Whale: {
                type: 'object',
                required: ['name', 'age', 'length', 'weight', 'gender', 'planktonEaten'],
                properties: {
                    name: { type: 'string', description: "Ім'я кита" },
                    age: { type: 'number', description: 'Вік кита у роках' },
                    length: { type: 'number', description: 'Довжина кита в сантиметрах' },
                    weight: { type: 'number', description: 'Вага кита в кілограмах' },
                    gender: { type: 'string', enum: ['male', 'female'], description: 'Стать кита' },
                    planktonEaten: {
                        type: 'number',
                        description: "Кількість з'їденого планктону (кг)",
                    },
                    description: { type: 'string', description: "Опис кита (необов'язкове поле)" },
                },
            },
        },
    },
};
