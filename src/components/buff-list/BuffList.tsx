"use client";
import React from 'react';
import styles from './BuffList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Buff } from '@/types/buffs';
import BuffCard from '../buff-card/BuffCard';



export const BuffList: React.FC = () => {
    const buffs = useSelector((state: RootState) => state.game.buffs.buffs);

    return (
        <div className={styles.buffList}>
            <span className={styles.title}>Бафы:</span>
            <div className={styles.list}>
                {buffs.map((buff: Buff) => (
                <div key={buff.id} className={styles.item}>
                    <BuffCard  buff={buff} />
                </div>
                ))}
            </div>
        </div>
    );
};