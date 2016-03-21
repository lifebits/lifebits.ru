'use strict';

import './uxModelByHomePage/uxModelByHomePage.scss';

import uxModelTemplate from './uxModel.jade';

import animate from './../../vendor/animate/animate.js'


export default class uxModel {
    constructor(opts) {

        this.elem = document.createElement('div');
        this.elem.className = 'wrap-uxModel';
        this.elem.innerHTML = uxModelTemplate(opts);

        //Описыываем анимацию
        animate({
            elemAnimated: this.elem.querySelector('.mainLine'),
            animateCssClass: ['slideInLeft'],
            duration: 1000
        }, () => {
            animate({
                elemAnimated: this.elem.getElementsByClassName('cell'),
                animateCssClass: 'flipInY',
                duration: 1000,
                delay: 140
            }, () => {
                animate({
                    elemAnimated: this.elem.getElementsByClassName('descriptionSection'),
                    animateCssClass: ['zoomInDown'],
                    duration: 1000,
                    delay: 100
                })
            });
        });


        this.elem.onclick = (e) => {
            let target = e.target;
            let button = target.closest('a');

            if (!button) return false;

            window.open('/ux-model.html', '_blank');
        };
    }


}