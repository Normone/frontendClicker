export interface Buff {
    id: number;
    name: string;
    description: string;
    imgSrc: string;
    isActive: boolean;
    baseCooldown: number;
    baseDuration: number;
    cooldown: number;
    duration: number;
    cost: number;
    income: number;
    type: 'click' | 'auto';
    unlocked: boolean;
}
