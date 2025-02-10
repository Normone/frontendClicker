"use client";
import React from 'react';
import styles from './TechnologyList.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Technology } from "@/types/technologies";
import TechnologyCard from '../technology-card/TechnologyCard';



export const TechnologyList: React.FC = () => {
    const technologies = useSelector((state: RootState) => state.game.technologies.technologies);

    return (
        <div className={styles.technologyList}>
            <span className={styles.title}>Технологии:</span>
            <div className={styles.list}>
                {technologies.map((tech: Technology) => (
                <div key={tech.id} className={styles.item}>
                    <TechnologyCard  technology={tech} />
                </div>
                ))}
            </div>
        </div>
    );
};