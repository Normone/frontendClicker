"use client";
import React from 'react';
import Image from 'next/image';
import styles from "./ItemCard.module.css";
import { useDispatch } from 'react-redux';
import { unlockItem, upgradeItem, updateMultiplier, buffUse } from '@/store/gameSlice';
import { Technology, Buff, Worker, Technique } from '@/types';
import { basePath } from '@/data';
import { shortenNumber } from '@/utils/shortenNumber';

interface ItemCardProps {
    data: Technology | Buff | Worker | Technique;
    type: 'technology' | 'buff' | 'worker' | 'technique';
}



export const ItemCard: React.FC<ItemCardProps> = ({ data, type }) => {
    const dispatch = useDispatch();
    
    const level = (data as Technology | Worker | Technique).level;
    const isAvtive = (data as Buff).isActive;
    const duration = (data as Buff).duration;
    const cooldown = (data as Buff).cooldown;
    const baseDuration = (data as Buff).baseDuration;
    const baseCooldown = (data as Buff).baseCooldown;
    const buffType = (data as Buff).type;
    let upgradeCost: number = 0;
    if (type === 'buff') {
        upgradeCost = data.cost;
    } else {
        upgradeCost = data.unlocked === false ?
        data.cost 
        : 
        data.cost * (level * level);
    }
    const upgradeCostView: string = shortenNumber(upgradeCost);
    const IncomeView = shortenNumber(data.income);

    const handleUpgrade = () => {
        dispatch(upgradeItem({id: data.id, type: type}));
        dispatch(updateMultiplier())
        
    };
    const handleUnlock = () => {
        dispatch(unlockItem({id: data.id, type: type}));
        dispatch(updateMultiplier())
        
    };

    const handleUse = () => {
        dispatch(buffUse(data.id));
    };

    switch (type) {
        case 'technology':
            return (
                <div className={`${styles.ItemCard} ${styles.technology}`}>
                    <div className={styles.info}>
                        <span className={styles.icon}>?</span>
                        <p className={styles.content}>{data.description}</p>
                    </div>
                    <div>
                        <Image
                            src={`${basePath}/imgs/${data.name}.svg`}
                            alt={`${data.name} icon`}
                            width={40}
                            height={40}
                            draggable="false"
                            unoptimized 
                        />
                        <span className={styles.title}>{data.name} </span>
                        <span className={styles.version}>(v{level})</span>
                    </div>
                    <div>
                        <span>Доход:</span>
                        <span>{IncomeView}/click</span>
        
                        {data.unlocked ? (
                            <button className={styles.button} onClick={() => handleUpgrade()}>
                                <span>Улучшить</span>
                                <span>({upgradeCostView})</span>
                            </button>
                        ) : (
                            <button className={styles.button} onClick={() => handleUnlock()}>
                                <span>Разблокировать</span>
                                <span>({upgradeCostView})</span>
                            </button>
                        )}
        
                    </div>
                </div>
            );
            // ---------------------------------------------------------------------------
        case 'buff':
            return (
                <div className={`${styles.ItemCard} ${styles.buff}`}>
                    <div className={styles.info}>
                        <span className={styles.icon}>?</span>
                        <p className={styles.content}>{data.description}</p>
                    </div>
                    <div>
                        <Image
                            src={data.imgSrc}
                            alt={`${data.name} icon`}
                            width={80}
                            height={80}
                            draggable="false"
                            unoptimized 
                        />
                        <span className={styles.title}>{data.name} </span>
                        {isAvtive ? (
                            <div className={styles.buffActive}>
                                <Image
                                src={`${basePath}/imgs/buffActive.gif`}
                                alt={`${data.name} active`}
                                width={26}
                                height={26}
                                draggable="false"
                                unoptimized 
                                />
                                <span>({duration})</span>
                            </div>
                        
                        ):(null)}
                    </div>
                    <div className={styles.title}>
                        <span className={styles.effect}>Эффект:</span>
                        <span className={styles.effectDesc}>х{data.income} к {buffType === 'auto' ? 'авто-добыче' : 'кликам'} на {baseDuration} сек. Кд {baseCooldown}</span>
        
                        {data.unlocked ? (
                            cooldown ? (
                                <button className={styles.button}>
                                <span>кд {cooldown}</span>
                                </button>
                            ): (
                                <button className={styles.button} onClick={() => handleUse()}>
                                <span>Использовать</span>
                                </button>
                            )
                        ) : (
                            <button className={styles.button} onClick={() => handleUnlock()}>
                                <span>Разблокировать</span>
                                <span>({upgradeCostView})</span>
                            </button>
                        )}
        
                    </div>
                </div>
            );
            // ---------------------------------------------------------------------------
        case 'worker':
            return (
                <div className={styles.ItemCard}>
                    <div className={styles.info}>
                        <span className={styles.icon}>?</span>
                        <p className={styles.content}>{data.description}</p>
                    </div>
                    <div>
                        <Image
                            src={data.imgSrc}
                            alt={`${data.name} icon`}
                            width={40}
                            height={40}
                            draggable="false"
                            unoptimized 
                        />
                        <span className={styles.title}>{data.name} </span>
                        <span className={styles.version}>(v{data.level})</span>
                    </div>
                    <div>
                        <span>Доход:</span>
                        <span>{IncomeView}/s</span>
        
                        {data.unlocked ? (
                            <>
                            <button className={styles.button} onClick={() => handleUpgrade()}>
                                <span>Улучшить</span>
                                <span>({upgradeCostView})</span>
                            </button>
                            </>
                        ) : (
                            <button className={styles.button} onClick={() => handleUnlock()}>
                                <span>Разблокировать</span>
                                <span>({upgradeCostView})</span>
                            </button>
                        )}
        
                    </div>
                </div>
            );
            // ---------------------------------------------------------------------------
        case 'technique':
            
    
        default:
            console.log(`Type card "${type}" is not found`)
            break;
    }

};