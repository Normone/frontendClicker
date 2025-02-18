export interface Technology {
    id: number;
    name: string;
    description: string;
    imgSrc: string;
    level: number;
    cost: number;
    income: number;
    type: 'click' | 'auto';
    unlocked: boolean;
}

