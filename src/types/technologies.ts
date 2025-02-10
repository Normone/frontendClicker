export interface Technology {
    id: number;
    name: string;
    description: string;
    version: number;
    cost: number;
    income: number;
    type: 'click' | 'auto';
    unlocked: boolean;
}

