"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import styles from './IncomeStats.module.css';
import { shortenNumber } from '@/utils/shortenNumber';

interface IncomeStatsProps {
    type: 'money' | 'clickMlt' | 'autoMlt';
}

export const IncomeStats: React.FC<IncomeStatsProps> = ({type}) => {
    const clickMultiplier = useSelector((state: RootState) => state.game.player.clickMultiplier);
    const autoMultiplier = useSelector((state: RootState) => state.game.player.autoMultiplier);
    const money = useSelector((state: RootState) => state.game.player.money);
    const clickMultiplierView = shortenNumber(clickMultiplier);
    const autoMultiplierView = shortenNumber(autoMultiplier);
    const moneyView = shortenNumber(money);
    
    


    switch (type) {
        case 'money':
            return (
                <div className={styles.stats}>
                    <span className={styles.value}>{moneyView}$</span>
                    {/* <img className={styles.icon} src="imgs/money-stack.svg" alt="money icon" /> */}
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><g transform="translate(0,0)"><path d="M327.027 65.816L229.79 128.23l9.856 5.397 86.51-55.53 146.735 83.116-84.165 54.023 4.1 2.244v6.848l65.923-42.316 13.836 7.838-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l64.633-41.487 15.127 8.57-79.76 51.195v11.723l100.033-64.21-24.828-14.062 24.827-15.937-24.828-14.064 24.827-15.937-23.537-13.333 23.842-15.305-166.135-94.106zm31.067 44.74c-21.038 10.556-49.06 12.342-68.79 4.383l-38.57 24.757 126.903 69.47 36.582-23.48c-14.41-11.376-13.21-28.35 2.942-41.67l-59.068-33.46zM227.504 147.5l-70.688 46.094 135.61 78.066 1.33-.85c2.5-1.61 6.03-3.89 10.242-6.613 8.42-5.443 19.563-12.66 30.674-19.86 16.002-10.37 24.248-15.72 31.916-20.694L227.504 147.5zm115.467 1.17a8.583 14.437 82.068 0 1 .003 0 8.583 14.437 82.068 0 1 8.32 1.945 8.583 14.437 82.068 0 1-.87 12.282 8.583 14.437 82.068 0 1-20.273 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.237zm-218.423 47.115L19.143 263.44l23.537 13.333-23.842 15.305 24.828 14.063-24.828 15.938 24.828 14.063-24.828 15.938 166.135 94.106L285.277 381.8V370.08l-99.433 63.824L39.11 350.787l14.255-9.15 131.608 74.547L285.277 351.8V340.08l-99.433 63.824L39.11 320.787l14.255-9.15 131.608 74.547L285.277 321.8V310.08l-99.433 63.824L39.11 290.787l13.27-8.52 132.9 75.28 99.997-64.188v-5.05l-5.48-3.154-93.65 60.11-146.73-83.116 94.76-60.824-9.63-5.543zm20.46 11.78l-46.92 30.115c14.41 11.374 13.21 28.348-2.942 41.67l59.068 33.46c21.037-10.557 49.057-12.342 68.787-4.384l45.965-29.504-123.96-71.358zm229.817 32.19c-8.044 5.217-15.138 9.822-30.363 19.688-11.112 7.203-22.258 14.42-30.69 19.873-4.217 2.725-7.755 5.01-10.278 6.632-.09.06-.127.08-.215.137v85.924l71.547-48.088v-84.166zm-200.99 17.48a8.583 14.437 82.068 0 1 8.32 1.947 8.583 14.437 82.068 0 1-.87 12.28 8.583 14.437 82.068 0 1-20.27 1.29 8.583 14.437 82.068 0 1 .87-12.28 8.583 14.437 82.068 0 1 11.95-3.236z"></path></g></svg>
                </div>
            )
        case 'clickMlt':
            return (
                <div className={styles.stats}>
                    <span className={styles.value}>{clickMultiplierView}/clk</span>
                    {/* <img className={styles.icon} src="imgs/cursor-default-click.svg" alt="click icon" /> */}
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10" /></svg>
                </div>
            )
        case 'autoMlt':
            return (
                <div className={styles.stats}>
                    <span className={styles.value}>{autoMultiplierView}$</span>
                    {/* <img className={styles.icon} src="imgs/refresh-auto.svg" alt="autoClick icon" /> */}
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.68 6H11.32L7 16H9L9.73 14H14.27L15 16H17L12.68 6M10.3 12.5L12 8L13.7 12.5H10.3M17.4 20.4L19 22H14V17L16 19C18.39 17.61 20 14.95 20 12C20 7.59 16.41 4 12 4S4 7.59 4 12C4 14.95 5.61 17.53 8 18.92V21.16C4.47 19.61 2 16.1 2 12C2 6.5 6.5 2 12 2S22 6.5 22 12C22 15.53 20.17 18.62 17.4 20.4Z" /></svg>
                </div>
            )
        default:
            return null
    }



}