"use client";
import React from 'react';
import styles from './List.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Technology, Buff, Worker,  } from "@/types";
import { ItemCard } from '@/components';


interface ListProps {
    type: 'technologies' | 'buffs' | 'workers' | 'technique';
}


export const List: React.FC<ListProps> = ({type}) => {
    const technologies = useSelector((state: RootState) => state.game.technologies);
    const buffs = useSelector((state: RootState) => state.game.buffs);
    const workers = useSelector((state: RootState) => state.game.workers);


    switch (type) {
        case 'technologies':

            return (
                <div className={`${styles.List} ${styles.technology}`}>
                    <span className={styles.title}>Технологии:</span>
                    <div className={styles.list}>
                        {technologies.map((tech: Technology) => (
                        <div key={tech.id} className={styles.item}>
                            <ItemCard  data={tech} type='technology' />
                        </div>
                        ))}
                    </div>
                </div>
            );
        case 'buffs':

            return (
                <div className={`${styles.List} ${styles.buff}`}>
                    <span className={styles.title}>Бафы:</span>
                    <div className={styles.list}>
                        {buffs.map((buff: Buff) => (
                        <div key={buff.id} className={styles.item}>
                        <ItemCard  data={buff} type='buff'/>
                        </div>
                        ))}
                    </div>
                </div>
            );
        case 'workers':

            return (
                <div className={`${styles.List} ${styles.worker}`}>
                    <span className={styles.title}>Работники:</span>
                    <div className={styles.list}>
                        {workers.map((worker: Worker) => (
                        <div key={worker.id} className={styles.item}>
                            <ItemCard  data={worker} type='worker'/>
                        </div>
                        ))}
                    </div>
                </div>
            );
            break;
        case 'technique':
        
            break;
    
        default:
            console.log(`Type ${type} is not found`);
            break;
    }
    
};