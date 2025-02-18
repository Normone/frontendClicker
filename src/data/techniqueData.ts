import { Technique } from '@/types';
import { basePath } from './basePath';

export const techniqueData: Technique[] = [
    {
        id: 1,
        name: 'Мышь',
        description: 'клацает',
        imgSrc: `${basePath}/imgs/pizza.jpg`,
        level: 1,
        cost: 10,
        income: 2,
        unlocked: false
    },
]