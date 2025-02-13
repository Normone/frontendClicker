import { loadState, resetGame, tick, updateMultiplier } from "@/store/gameSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { TechnologyList } from "@/components/technology-list/TechnologyList";
import { ClickBtn } from "@/components/click-btn/ClickBtn";
import { IncomeStats } from "@/components/income-stats/IncomeStats";
import { RootState, AppDispatch } from "@/store/index";
import { BuffList } from "@/components/buff-list/BuffList";
const LOCAL_STORAGE_KEY = 'gameFrontEndClickerSave';

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const gameState = useSelector((state: RootState) => state.game);

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
                <TechnologyList/>
            </div>
            <div className={styles.clickBtn}>
                <ClickBtn/>
            </div>
            <div className={styles.buffList}>
                <BuffList/>
            </div>
            <button onClick={resetHundler}>reset</button>
        </div>
    );
}