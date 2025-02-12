"use client";
import React, { useRef, useState } from 'react';
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
    opacity: number;
}

export const ClickBtn: React.FC = () => {
    const dispatch = useDispatch();
    const clickMultiplier = useSelector((state: RootState) => state.game.player.clickMultiplier);

    const [clicks, setClicks] = useState(0);
    const [animations, setAnimations] = useState<Animation[]>([]);
    const divRef = useRef<HTMLButtonElement>(null);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(addMoney(clickMultiplier));

        const clickValue = clickMultiplier;
        setClicks(clicks + clickValue);

        // Get coordinates relative to the button
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        // Generate random translation values for this animation
        const translateX = Math.random() * 80 - 40;
        const translateY = Math.random() * 80 - 40;

        // Create a new animation object
        const animation: Animation = {
            id: Date.now(), // Unique ID for each animation
            x: x,    // Mouse X position relative to div
            y: y,    // Mouse Y position relative to div
            translateX: 0, // Store the random X translation
            translateY: 0, // Store the random Y translation
            value: `+${clickValue}`, // Value to display
            opacity: 1,
        };

        setAnimations([...animations, animation]);


        setTimeout(() => {
            setAnimations(prevAnimations =>
                prevAnimations.map(anim =>
                    anim.id === animation.id ? { ...anim, opacity: 0, translateX, translateY } : anim
                )
            );
        }, 1);

        // Remove the animation after 1 second
        setTimeout(() => {
            setAnimations(prevAnimations => prevAnimations.filter(anim => anim.id !== animation.id));
        }, 1500);
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
                            opacity: animation.opacity, // Start with opacity 1
                            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out', // Fade out and move
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