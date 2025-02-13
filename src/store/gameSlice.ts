import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Technology } from '@/types/technologies';
import { Buff } from '@/types/buffs';
import { technologiesData } from '../data/technologiesData';
import { buffsData } from '../data/buffsData';



interface TechnologiesState {
    technologies: Technology[];
}
interface BuffsState {
    buffs: Buff[]
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
    buffs: BuffsState;
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
    buffs: {
        buffs: buffsData,
    }
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
        unlockBuff: (state, action: PayloadAction<number>) => {
            const buff = state.buffs.buffs.find((buff) => buff.id === action.payload);
            if (buff && !buff.unlocked) {
                buff.unlocked = true;
            }
        },
        buffUse: (state, action: PayloadAction<number>) => {
            const buff = state.buffs.buffs.find((buff) => buff.id === action.payload);
            if (buff && buff.unlocked && buff.cooldown == 0) {
                buff.isActive = true;
                buff.cooldown = buff.baseCooldown;
                buff.duration = buff.baseDuration;
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
            let newAutoMultiplier = 0;
            // let buffBonusClick = 0;
            // let buffAutoClick = 0;

            state.technologies.technologies.forEach(tech => {
                if (tech.unlocked) {
                    if (tech.type === 'click') {
                        newClickMultiplier += tech.income;
                    } else if (tech.type === 'auto') {
                        newAutoMultiplier += tech.income;
                    }
                }
            });

            state.buffs.buffs.forEach(buff => {
                if (buff.unlocked && buff.isActive && buff.duration > 0) {
                    if (buff.type === 'click') {
                        newClickMultiplier = newClickMultiplier * buff.income;
                    } else if (buff.type === 'auto') {
                        newAutoMultiplier = newAutoMultiplier * buff.income;
                    }
                    buff.duration--
                    if (buff.duration == 0) {
                        buff.isActive = false;
                    }
                }
                if (buff.cooldown > 0) {
                    buff.cooldown--;
                }
            });


            state.player.clickMultiplier = newClickMultiplier;
            state.player.autoMultiplier = newAutoMultiplier;
        },
        resetGame: (state) => {
            state.player.money = 0;
            state.player.clickMultiplier = 1;
            state.player.autoMultiplier = 0;
            state.technologies.technologies = technologiesData;
            state.buffs.buffs = buffsData;
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
    unlockBuff,
    upgradeTechnology,
    buffUse,
    addMoney,
    updateMultiplier,
    tick,
    resetGame
} = gameSlice.actions;

export default gameSlice.reducer;