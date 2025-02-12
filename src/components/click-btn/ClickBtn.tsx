"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney } from '@/store/gameSlice';
import { RootState } from '@/store';
import styles from './ClickBtn.module.css';
import basePath from '@/data/basePath';

// interface ClickBtnProps {}

interface Animation {
    id: number;
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    value: string;
}

export const ClickBtn: React.FC = () => {
    const dispatch = useDispatch();
    const clickMultiplier = useSelector((state: RootState) => state.game.player.clickMultiplier);

    const [clicks, setClicks] = useState(0);
    const [animations, setAnimations] = useState<Animation[]>([]);
    const divRef = useRef<HTMLButtonElement>(null);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(addMoney(clickMultiplier));

        const clickValue = clickMultiplier; // Replace with your actual click value
        setClicks(clicks + clickValue);

        // Get coordinates relative to the button
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        // Generate random translation values for this animation
        const translateX = Math.random() * 40 - 20;
        const translateY = Math.random() * 40 - 20;

        // Create a new animation object
        const animation: Animation = {
            id: Date.now(), // Unique ID for each animation
            x: x,    // Mouse X position relative to div
            y: y,    // Mouse Y position relative to div
            translateX: translateX, // Store the random X translation
            translateY: translateY, // Store the random Y translation
            value: `+${clickValue}`, // Value to display
        };

        setAnimations([...animations, animation]);

        // Remove the animation after 1 second
        setTimeout(() => {
            setAnimations(prevAnimations => prevAnimations.filter(anim => anim.id !== animation.id));
        }, 1000);
    };

    

    return (
        <div className={styles.clickBtn}>
            <button onClick={handleClick} ref={divRef}>
                <Image
                    src={`${basePath}/imgs/galera.jpg`}
                    alt={`click button`}
                    width={100}
                    height={100}
                    draggable="false"
                    unoptimized
                />
                {animations.map(animation => (
                    <span
                        key={animation.id}
                        style={{
                            position: 'absolute',
                            left: animation.x,
                            top: animation.y,
                            pointerEvents: 'none',
                            opacity: 1, // Start with opacity 1
                            transition: 'opacity 1s ease-out, transform 1s ease-out', // Fade out and move
                            transform: `translate(${animation.translateX}px, ${animation.translateY}px)`, // Move to a random position
                            
                        }
                    }
                    >
                        {animation.value}
                    </span>
                ))}
            </button>
            
            

            

            
        </div>
    );
}