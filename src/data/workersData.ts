import { Worker } from '@/types';
import { basePath } from './basePath';

export const workersData: Worker[] = [
    {
        id: 1,
        name: 'Джун-индус',
        description: 'Говнокодит',
        imgSrc: `${basePath}/imgs/pizza.jpg`,
        level: 1,
        cost: 10,
        income: 1,
        unlocked: false
    },
]