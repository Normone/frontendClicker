import { Technology } from '@/types/technology';
import { basePath } from './basePath';

export const technologiesData: Technology[] = [
    {
        id: 1, name: 'HTML',
        description: 'Это как кирпичи и каркас. Он определяет, что вообще есть на странице: текст, картинки, кнопки. Это скелет твоего сайта.',
        level: 1, cost: 100, income: 1, type: 'click', unlocked: true,
        imgSrc: `${basePath}/imgs/HTML.svg`
    },
    {
        id: 2, name: 'CSS',
        description: 'Это отделка, обои, мебель. Он отвечает за внешний вид: цвета, шрифты, расположение элементов. Он делает сайт красивым и стильным.',
        level: 1, cost: 200, income: 2, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/CSS.svg`
    },
    {
        id: 3, name: 'JS',
        description: 'Это как электричество, водопровод и умный дом. Он добавляет интерактивность: анимации, ответы на нажатия кнопок, обновление данных на лету. Он делает сайт живым и функциональным.',
        level: 1, cost: 400, income: 4, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/JS.svg`
    },
    {
        id: 4, name: 'JQuery',
        description: '',
        level: 1, cost: 800, income: 8, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/JQuery.svg`
    },
    {
        id: 5, name: 'TypeScript',
        description: '',
        level: 1, cost: 1600, income: 16, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/TypeScript.svg`
    },
    {
        id: 6, name: 'SASS',
        description: '',
        level: 1, cost: 3200, income: 32, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/SASS.svg`
    },
    {
        id: 7, name: 'React',
        description: '',
        level: 1, cost: 6400, income: 64, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/React.svg`
    },
    {
        id: 8, name: 'Angular',
        description: '',
        level: 1, cost: 12800, income: 128, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/Angular.svg`
    },
    {
        id: 9, name: 'Vue',
        description: '',
        level: 1, cost: 25600, income: 256, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/Vue.svg`
    },
    {
        id: 10, name: 'PHP',
        description: '',
        level: 1, cost: 51200, income: 512, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/PHP.svg`
    },
    {
        id: 11, name: 'Redux',
        description: '',
        level: 1, cost: 102400, income: 1024, type: 'click', unlocked: false,
        imgSrc: `${basePath}/imgs/Redux.svg`
    },
]