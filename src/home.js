'use strict';

import './css/index.scss';
import './css/home.scss';

import homeTemplate from './template/home.jade';

//Header Init
import header from './ui/header';
let Header = new header();
document.body.appendChild(Header.elem);

//Home page Init
let contentBlock = document.createElement('div');
contentBlock.className = 'content-wrap';
contentBlock.innerHTML = homeTemplate();
document.body.appendChild(contentBlock);

//UX Model Init
import uxModel from './ui/uxModel/uxModelOnly';
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
                name: "медийная",
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
        description: "UX-проектировщик, в зависимости от точки входа, выстраивает для посетителя маршрут и посетитель начинает свое знакомство с вашим продуктом."
    },
    consultation: {
        responsibility: "врачи клиники",
        cells: [
            {
                name: "консуль- тация",
                id: "consultation"
            }
        ],
        description: "Более глубокое изучение продукта, под руководством опытного врача-терапевта, с использованием вспомогательных инструментов. Посетитель принимает окончательное решение по предлагаемому продукту и становится вашим пользователем."
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
document.getElementById('container-uxModel').appendChild(Model.elem);

//CardDeck Init
import cardDeck from "./ui/cardDeck";
let CardDeck = new cardDeck(
    {
        itemsDir: "427",
        lists: [
            {
                listName: "asur",
                items: [
                    "/ASUR-entry.jpg",
                    "/ASUR-report(1-2).jpg",
                    "/ASUR-report(3-4).jpg",
                    "/ASUR-report(7-8).jpg",
                    "/ASUR-report(5).jpg",
                    "/ASUR-report(6).jpg",
                    "/ASUR-report(9).jpg",
                    "/ASUR-start.jpg"
                ]
            },
            {
                listName: "mafon",
                items: [
                    "/mafon-01.jpg",
                    "/mafon-02.jpg"
                ]
            },
            {
                listName: "moro",
                items: [
                    "/moro-01.jpg",
                    "/moro-02.jpg",
                    "/moro-03.jpg",
                    "/moro-04.jpg"
                ]

            }
        ]
    }
);
document.getElementById('webApp').appendChild(CardDeck.elem);

//Project Review Init
import siteReview from './ui/siteReview/index.js';
let SiteReview = new siteReview({
    index: {
        pageName: "главная",
        urlSite: "evostone.ru",
        imgName: "evostone-main-page.jpg",
        scrollItems: [
            {name: "навигация", translateValue: 0},
            {name: "преимущества", translateValue: 650},
            {name: "характеристики", translateValue: 1316},
            {name: "энергоэффективность", translateValue: 1960},
            {name: "современные решения", translateValue: 2490},
            {name: "футер", translateValue: 2906}
        ]
    },
    building: {
        pageName: "строительство",
        urlSite: "evostone.ru/building",
        imgName: "evostone-build-page.jpg",
        scrollItems: [
            {name: "мрачный пейзаж", translateValue: 0},
            {name: "солнечный пейзаж", translateValue: 650},
            {name: "современный дом", translateValue: 1200},
            {name: "кто будет строить?", translateValue: 1554},
            {name: "почему мы?", translateValue: 1840},
            {name: "энергоэффективность", translateValue: 2178},
            {name: "о компании", translateValue: 2396},
            {name: "примеры работ", translateValue: 2870},
            {name: "футер", translateValue: 3240}
        ]
    }
});
document.getElementById('siteDevelopment').appendChild(SiteReview.elem);

//Footer Init
import footer from './ui/footer';
let Footer = new footer({});
document.body.appendChild(Footer.elem);


//WindowScroll Init
import activationSection from './vendor/activationSection';
let sectionList = document.getElementsByClassName('pageSection');
window.onscroll = function() {
    activationSection(sectionList);
};