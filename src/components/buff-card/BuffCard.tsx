"use client";
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { unlockBuff, buffUse } from '@/store/gameSlice';
import styles from "./BuffCard.module.css";
import { RootState } from '@/store';
import { addMoney } from '@/store/gameSlice';
import { Buff } from '@/types/buffs';

interface BuffCardProps {
    buff: Buff;
}



const BuffCard: React.FC<BuffCardProps> = ({ buff }) => {
    const dispatch = useDispatch();
    const money = useSelector((state: RootState) => state.game.player.money);

    const handleUse = () => {
        dispatch(buffUse(buff.id));
    };
    const handleUnlock = () => {
        if (money >= buff.cost) {
            dispatch(unlockBuff(buff.id));
            dispatch(addMoney(-buff.cost));
        }
        
    };

    return (
        <div className={styles.BuffCard}>
            <div className={styles.info}>
                <span className={styles.icon}>?</span>
                <p className={styles.content}>{buff.description}</p>
            </div>
            <div>
                <Image
                    src={buff.imgSrc}
                    alt={`${buff.name} icon`}
                    width={80}
                    height={80}
                    draggable="false"
                    unoptimized 
                />
                <span className={styles.title}>{buff.name} </span>
                {buff.isActive ? (
                    <div className={styles.buffActive}>
                        <Image
                        src={`/imgs/buffActive.gif`}
                        alt={`${buff.name} active`}
                        width={26}
                        height={26}
                        draggable="false"
                        unoptimized 
                        />
                    </div>
                
                ):(null)}
            </div>
            <div className={styles.title}>
                <span className={styles.effect}>Эффект:</span>
                <span className={styles.effectDesc}>х{buff.income} к {buff.type === 'auto' ? 'авто-добыче' : 'кликам'} на {buff.baseDuration} сек. Кд {buff.baseCooldown}</span>

                {buff.unlocked ? (
                    buff.cooldown ? (
                        <button className={styles.button}>
                        <span>кд {buff.cooldown}</span>
                        </button>
                    ): (
                        <button className={styles.button} onClick={() => handleUse()}>
                        <span>Использовать</span>
                        </button>
                    )
                ) : (
                    <button className={styles.button} onClick={() => handleUnlock()}>
                        <span>Разблокировать</span>
                        <span>({buff.cost})</span>
                    </button>
                )}

            </div>
        </div>
    );
};

export default BuffCard;