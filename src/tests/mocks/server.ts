// src/tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Создаем сервер MSW, который будет слушать запросы
export const server = setupServer(...handlers);
