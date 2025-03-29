export interface Enemy {
    id: number;
    name: string;
    hp: number;
    description: string;
    imgSrc: string;
    baseTimer: number;
    timer: number;
    costPlayerLevel: number;
    income: number;
    unlocked: boolean;
    isActive: boolean;
}