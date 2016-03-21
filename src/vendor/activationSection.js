'use strict';

import animate from './animate/animate';

export default function(sectionList) {

    let anchorList = {
        ux() {
            console.log("Active UX section");
        },
        webApp(section) {
            let animatedElemList = section.getElementsByClassName('kineticElement');

            animate({
                elemAnimated: animatedElemList,
                animateCssClass: 'fadeInRight',
                duration: 800,
                delay: 200
            });

            console.log("Active webApp section");
        },
        basicSkills() {},
        siteDevelopment(section) {
            let sectionNav = section.querySelector('.img-scroll-nav');
            let animatedElemList = sectionNav.getElementsByTagName('li');

            animate({
                elemAnimated: animatedElemList,
                animateCssClass: ['fadeInUp', 'fast'],
                duration: 400,
                delay: 100
            }, function() {
                let line = sectionNav.querySelector('.line');
                animate({
                    elemAnimated: line,
                    animateCssClass: ['fadeInUp', 'fast'],
                    duration: 400
                });
            });

            console.log("siteDevelopment Active!");
        },
        footer(section) {
            let centerPart = section.querySelector('.centerPart');
            let animatedElemList = centerPart.getElementsByTagName('a');

            animate({
                elemAnimated: animatedElemList,
                animateCssClass: 'flipInY',
                duration: 800,
                delay: 200
            });

            console.log("footer Active!");
        }
    };



    for (let i=0; i<sectionList.length; i++) {
        let section = sectionList[i];

        //Проверка на видимость секции на экране
        if (isVisible(section)) {

            //Проверка, была ли секция показана пользователю
            if (!section.classList.contains('activated')) {
                section.classList.add('activated');
                anchorList[section.id](section);
            }

            //Активная секция
            if (!section.classList.contains('current')) {
                section.classList.add('current');
                //Синхронизируем состояние headerNav с текущим, видимым, разделом
                syncStateHeaderNav(section.id);
            }



        } else {
            section.classList.remove('current');
            //Если захочется постоянного включения анимаций
            //section.classList.remove('activated')
        }
    }


    function isVisible(elem) {
        let coords = elem.getBoundingClientRect();
        let windowHeight = document.documentElement.clientHeight;

        let getNextSiblingHeight = () => {
            if (elem.nextSibling) {
                return elem.nextSibling.getBoundingClientRect().height
            }
            else {
                return 0
            }
        };

        let nextSiblingHeight = getNextSiblingHeight();
        let topVisible, bottomVisible;

        if (coords.height > windowHeight) {
            topVisible = coords.top > 0 && coords.top < windowHeight/3;
            bottomVisible = coords.bottom >= windowHeight-nextSiblingHeight;
        } else {
            //topVisible = false;
            topVisible = coords.top > 0 && coords.top < windowHeight/3;
            bottomVisible = coords.bottom <= windowHeight && coords.bottom >= windowHeight-nextSiblingHeight && coords.top > 0;
        }

        /*
        let topVisible = coords.top > 0 && coords.top < windowHeight/3;
        let bottomVisible = coords.bottom <= windowHeight && coords.bottom > 0;
        */

        /*console.log(topVisible + " / " + bottomVisible);
        console.log(windowHeight-nextSiblingHeight + " / " + coords.bottom);
        console.log(coords);
        console.log(windowHeight);*/

        return topVisible || bottomVisible;
    }


    function syncStateHeaderNav(sectionId) {
        let header = document.getElementById('header');
        let headerNav = header.querySelector('nav');
        let headerNavButtonList = headerNav.getElementsByTagName('a');

        for (let i=0; i<headerNavButtonList.length; i++) {
            let currentElement = headerNavButtonList[i];
            let dataSectionId = currentElement.dataset['sectionId'];

            currentElement.classList.remove('active');

            if (dataSectionId == sectionId) {
                if (!currentElement.classList.contains('active')) {
                    currentElement.classList.add('active');
                }
            }

            //console.log(sectionId);
        }

        //console.log("Run syncStateHeaderNav");
    }

}