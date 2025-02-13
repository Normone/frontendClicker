import { Buff } from '@/types/buffs';
import basePath from './basePath';

export const buffsData: Buff[] = [
    {
        id: 1,
        name: 'Холодная пицца',
        description: 'Классическая еда тру погроммистов',
        isActive: false,
        imgSrc: `${basePath}/imgs/pizza.jpg`,
        baseDuration: 60,
        baseCooldown: 120,
        duration: 0,
        cooldown: 0,
        cost: 10,
        income: 2,
        type: 'click',
        unlocked: false
    },
    {
        id: 2,
        name: 'Имба Энерджи',
        description: 'Сей чудесный напиток богов очень настойчиво рекомендует некий бородатый мошенник в красных кедах',
        isActive: false,
        imgSrc: `${basePath}/imgs/imbaEnergy.png`,
        baseDuration: 60,
        baseCooldown: 120,
        duration: 0,
        cooldown: 0,
        cost: 20,
        income: 5,
        type: 'auto',
        unlocked: false
    },
]