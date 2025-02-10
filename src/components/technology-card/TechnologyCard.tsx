"use client";
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { unlockTechnology, upgradeTechnology } from '@/store/gameSlice';
import styles from "./TechnologyCard.module.css";
import { Technology } from '@/types/technologies';
import { RootState } from '@/store';
import { addMoney, updateMultiplier } from '@/store/gameSlice';

interface TechnologyCardProps {
    technology: Technology;
}



const TechnologyCard: React.FC<TechnologyCardProps> = ({ technology }) => {
    const dispatch = useDispatch();
    const money = useSelector((state: RootState) => state.game.player.money);
    const upgradeCost = technology.unlocked === false ?
    technology.cost : technology.cost * (technology.version * technology.version);

    const handleUpgrade = () => {
        if (money >= upgradeCost) {
            dispatch(upgradeTechnology(technology.id));
            dispatch(addMoney(-upgradeCost));
            dispatch(updateMultiplier())
        }
    };
    const handleUnlock = () => {
        if (money >= upgradeCost) {
            dispatch(unlockTechnology(technology.id));
            dispatch(addMoney(-upgradeCost));
            dispatch(updateMultiplier())
        }
        
    };

    return (
        <div className={styles.TechnologyCard}>
            <div className={styles.info}>
                <span className={styles.icon}>?</span>
                <p className={styles.content}>{technology.description}</p>
            </div>
            <div>
                {/* <img src={`imgs/${technology.name}.svg`} alt={`${technology.name} icon`} /> */}
                <Image
                    src={`/imgs/${technology.name}.svg`}
                    alt={`${technology.name} icon`}
                    width={40}
                    height={40}
                />
                <span className={styles.title}>{technology.name} </span>
                <span className={styles.version}>(v{technology.version})</span>
            </div>
            <div>
                <span>Доход:</span>
                <span>{technology.income} {technology.type === 'auto' ? '/s' : '/click'}</span>

                {technology.unlocked ? (
                    <>
                    <button className={styles.button} onClick={() => handleUpgrade()}>
                        <span>Улучшить</span>
                        <span>({upgradeCost})</span>
                    </button>
                    </>
                ) : (
                    <button className={styles.button} onClick={() => handleUnlock()}>
                        <span>Разблокировать</span>
                        <span>({upgradeCost})</span>
                    </button>
                )}

            </div>
        </div>
    );
};

export default TechnologyCard;