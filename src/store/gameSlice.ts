import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Technology, Buff, Worker, Technique } from '@/types';
import { technologiesData, buffsData, workersData, techniqueData } from '@/data';



interface PlayerState {
    money: number;
    clickMultiplier: number;
    autoMultiplier: number;
    prestigeLevel: number;
}

interface GameState {
    player: PlayerState;
    technologies: Technology[];
    buffs: Buff[];
    workers: Worker[];
    technique: Technique[];
}

const initialState: GameState = {
    player: {
        money: 0,
        clickMultiplier: 0,
        autoMultiplier: 0,
        prestigeLevel: 0,
    },
    technologies: technologiesData,
    buffs: buffsData,
    workers : workersData,
    technique: techniqueData,
};

interface UnlockAndUpgradePayload {
    id: number;
    type: 'technology' | 'buff' | 'worker' | 'technique';
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        loadState: (state, action: PayloadAction<GameState>) => { // Загрузка состояния из localStorage
            return action.payload;
        },
        unlockItem: (state, action: PayloadAction<UnlockAndUpgradePayload>) => {
            const { id, type } = action.payload;
            

            switch (type) {
                case 'technology':
                    const technology = state.technologies.find((tech) => tech.id === id);
                    
                    if (technology && !technology.unlocked && state.player.money >= technology.cost) {
                        technology.unlocked = true;
                        state.player.money -= technology.cost;
                    }
                    break;
                case 'buff':
                    const buff = state.buffs.find((buff) => buff.id === id);
                    if (buff && !buff.unlocked && state.player.money >= buff.cost) {
                        buff.unlocked = true;
                        state.player.money -= buff.cost;
                    }
                    break;
                case 'worker':
                    const worker = state.workers.find((worker) => worker.id === id);
                    if (worker && !worker.unlocked && state.player.money >= worker.cost) {
                        worker.unlocked = true;
                        state.player.money -= worker.cost;
                    }
                    break;
                // case 'technique':
                //     const technique = state.technique.technique.find((technique) => technique.id === id);
                //     if (technique && !technique.unlocked) {
                //         technique.unlocked = true;
                //     }
                //     break;
                    
                default:
                    console.warn(`Item with id ${id} of type ${type} not found or already unlocked.`);
                    break;
            }
        },
        buffUse: (state, action: PayloadAction<number>) => {
            const buff = state.buffs.find((buff) => buff.id === action.payload);
            if (buff && buff.unlocked && buff.cooldown == 0) {
                buff.isActive = true;
                buff.cooldown = buff.baseCooldown;
                buff.duration = buff.baseDuration;
            }
        },
        upgradeItem: (state, action: PayloadAction<UnlockAndUpgradePayload>) => {
            const { id, type } = action.payload;

            switch (type) {
                case 'technology':
                    const technology = state.technologies.find((tech) => tech.id === id);
                    if (technology) {
                        technology.level += 1;
                        technology.income = technology.income * 2;
                    }
                    break;
                case 'worker':
                    const worker = state.workers.find((worker) => worker.id === id);
                    if (worker) {
                        worker.level += 1;
                        worker.income = worker.income * 2;
                    }
                    break;
                // case 'technique':
                //     const technique = state.technique.find((technique) => technique.id === id);
                //     if (technique) {
                //         technique.level += 1;
                //         technique.income = technique.income * 2;
                //     }
                //     break;
                    
                default:
                    console.warn(`Item with id ${id} of type ${type} not found or already unlocked.`);
                    break;
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

            state.technologies.forEach(tech => {
                if (tech.unlocked) {
                    if (tech.type === 'click') {
                        newClickMultiplier += tech.income;
                    } 
                    // else if (tech.type === 'auto') {
                    //     newAutoMultiplier += tech.income;
                    // }
                }
            });

            state.workers.forEach(worker => {
                if (worker.unlocked) {
                    newAutoMultiplier += worker.income;
                }
            });

            state.buffs.forEach(buff => {
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
            state.technologies = technologiesData;
            state.buffs = buffsData;
            state.workers = workersData;
            state.technique = techniqueData;
        },
        tick: (state) => {
            state.player.money += state.player.autoMultiplier;
            state.player.money = Math.round(state.player.money);
        },
    },
});

export const {
    loadState,
    unlockItem,
    upgradeItem,
    buffUse,
    addMoney,
    updateMultiplier,
    tick,
    resetGame
} = gameSlice.actions;

export default gameSlice.reducer;