"use client";
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney } from '@/store/gameSlice';
import { RootState } from '@/store';
import styles from './ClickBtn.module.css';
import basePath from '@/data/basePath';

// interface ClickBtnProps {}

export const ClickBtn: React.FC = () => {
    const dispatch = useDispatch();
    const clickMultiplier = useSelector((state: RootState) => state.game.player.clickMultiplier);

    const handleClick = () => {
        dispatch(addMoney(clickMultiplier));
    };

    return (
        <div className={styles.clickBtn}>
            {/* <img src="imgs/galera.jpg" alt="click button" onClick={handleClick}/> */}
            <Image
                src={`${basePath}/imgs/galera.jpg`}
                alt={`click button`}
                width={100}
                height={100}
                onClick={handleClick}
                unoptimized
            />
        </div>
    );
}