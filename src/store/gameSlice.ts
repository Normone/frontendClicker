import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Technology } from '@/types/technologies';
import { technologiesData } from '../data/technologiesData';

interface TechnologiesState {
    technologies: Technology[];
}

interface PlayerState {
    money: number;
    clickMultiplier: number;
    autoMultiplier: number;
    prestigeLevel: number;
}

interface GameState {
    player: PlayerState;
    technologies: TechnologiesState;
}

const initialState: GameState = {
    player: {
        money: 0,
        clickMultiplier: 0,
        autoMultiplier: 0,
        prestigeLevel: 0,
    },
    technologies: {
        technologies: technologiesData,
    },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        loadState: (state, action: PayloadAction<GameState>) => { // Загрузка состояния из localStorage
            return action.payload;
        },
        unlockTechnology: (state, action: PayloadAction<number>) => {
            const technology = state.technologies.technologies.find((tech) => tech.id === action.payload);
            if (technology && !technology.unlocked) {
                technology.unlocked = true;
            }
        },
        upgradeTechnology: (state, action: PayloadAction<number>) => {
            const technology = state.technologies.technologies.find((tech) => tech.id === action.payload);
            if (technology) {
                technology.version += 1;
                technology.income = technology.income * 2;
            }
        },
        addMoney: (state, action: PayloadAction<number>) => {
            state.player.money += action.payload;
            state.player.money = Math.round(state.player.money);
        },
        updateMultiplier: (state) => {
            let newClickMultiplier = 0;
            let newAutoIncome = 0;

            state.technologies.technologies.forEach(tech => {
                if (tech.unlocked) {
                    if (tech.type === 'click') {
                        newClickMultiplier += tech.income;
                    } else if (tech.type === 'auto') {
                        newAutoIncome += tech.income;
                    }
                }
            });
            state.player.clickMultiplier = newClickMultiplier;
            state.player.autoMultiplier = newAutoIncome;
        },
        resetGame: (state) => {
            state.player.money = 0;
            state.player.clickMultiplier = 1;
            state.player.autoMultiplier = 0;
            state.technologies.technologies = technologiesData;
        },
        tick: (state) => {
            state.player.money += state.player.autoMultiplier;
            state.player.money = Math.round(state.player.money);
        },
    },
});

export const {
    loadState,
    unlockTechnology,
    upgradeTechnology,
    addMoney,
    updateMultiplier,
    tick,
    resetGame
} = gameSlice.actions;

export default gameSlice.reducer;