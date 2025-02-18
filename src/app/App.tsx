import { loadState, resetGame, tick, updateMultiplier } from "@/store/gameSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { ClickBtn, IncomeStats, List } from '@/components';
import { RootState, AppDispatch } from "@/store/index";
const LOCAL_STORAGE_KEY = 'gameFrontEndClickerSave';

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const gameState = useSelector((state: RootState) => state.game);
    const [tab, setTab] = useState('technologies')

    useEffect(() => {
        const storedGame = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(storedGame) {
            try {
                const parsed = JSON.parse(storedGame);
                dispatch(loadState(parsed));
            } catch (e: unknown) {
                console.log("Couldn't load stored game", e);
            }
        }
        dispatch(updateMultiplier());

    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
    }, [gameState]);

    const resetHundler = () => {
        dispatch(resetGame())
    }
    const tabHundler = (tab: 'technologies' | 'workers' | 'technique') => {
        setTab(tab);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(updateMultiplier());
            dispatch(tick());
        }, 1000);

        return () => clearInterval(intervalId); // Очистка интервала при размонтировании
    }, [dispatch]);

    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Frontend Clicker</h1>
            <div className={styles.stats}>
                <IncomeStats type='money'/>
                <IncomeStats type='clickMlt'/>
                <IncomeStats type='autoMlt'/>
            </div>
            <div className={styles.techList}>
                <div className={styles.switch}>
                    <button className={tab === "technologies" ? styles.isActive: ''} 
                    onClick={() => {tabHundler("technologies")}}>Технологии</button>
                    <button className={tab === "workers" ? styles.isActive: ''} 
                    onClick={() => {tabHundler("workers")}}>Работники</button>
                    <button className={tab === "technique" ? styles.isActive: ''} 
                    onClick={() => {tabHundler("technique")}}>Техника</button>
                </div>
                {tab === "technologies" ?
                    <List type="technologies"/>
                    :
                    null
                }
                {tab === "workers"?
                    <List type="workers"/>
                    :
                    null
                }
            </div>
            <div className={styles.clickBtn}>
                <ClickBtn/>
            </div>
            <div className={styles.buffList}>
                <List type="buffs"/>
            </div>
            <button onClick={resetHundler}>reset</button>
        </div>
    );
}