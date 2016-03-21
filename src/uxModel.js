'use strict';

import './css/index.scss';
import uxModel from './ui/uxModel/index.js';

let Model = new uxModel({
    start: {
        responsibility: "посетитель",
        cells: [
            {
                name: "старт"
            }
        ],
        description: "Потребность в продукте, который предоставляет ваша компания. Начинается поиск интересных предложений."
    },
    ad: {
        responsibility: "отдел маркетинга и рекламы",
        cells: [
            {
                name: "интернет",
                id: "internetAd"
            },
            {
                name: "неме- дийная",
                id: "noMediaAd"
            },
            {
                name: "ме- дийная",
                id: "mediaAd"
            }
        ],
        description: "Должен завладеть вниманием посетителя и передать в руки UX-проектировщика"
    },
    firstTouch: {
        responsibility: "сотрудники компании",
        cells: [
            {
                name: "веб-сайт",
                id: "webSite"
            },
            {
                name: "колл центр",
                id: "collCenter"
            },
            {
                name: "ресепшен",
                id: "reception"
            }
        ],
        description: "UX-проектировщик, в зависимости от точки входа, выстраивает для посетителя маршрут и он начинает свое знакомство с вашим продуктом."
    },
    consultation: {
        responsibility: "врачи клиники",
        cells: [
            {
                name: "кон- сульта- ция",
                id: "consultation"
            }
        ],
        description: "Более глубокое изучение продукта под руководством опытного врача-терапевта, с использованием вспомогательных инструментов. Посетитель принимает окончательное решение по предлагаемому продукту и становится вашим пользователем."
    },
    purchase: {
        responsibility: "врачи клиники",
        cells: [
            {
                name: "лечение",
                id: "purchase"
            }
        ],
        description: "Пользователь начинает пользоваться предложенным продуктом."
    },
    service: {
        responsibility: "врачи клиники",
        cells: [
            {
                name: "сервис обслужи- вание",
                id: "service"
            }
        ],
        description: "После окончания курса лечения, пользователь сопровождается дальше, чтобы сохранить эффект от полученного лечения."
    }
});

document.body.appendChild(Model.elem);