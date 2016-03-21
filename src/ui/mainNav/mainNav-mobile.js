'use strict';

import './mainNav-mobile.scss';

import animate from '../../vendor/animate/animate.js';
import mainNav from './index.js';
import template from './mainNav-mobile.jade';

export default class extends mainNav {
    constructor() {
        super();

        this.elem = document.createElement('nav');
        this.elem.className = 'mainNav-mobile';
        this.elem.innerHTML = template();

        this.elem.classList.add("invisible");

        this.animateMobileNav();

        this.elem.onclick = (e) => {
            this.scrollPage(e);
            this.destroy();
        }
    }

    scrollPage(e) {
        super.scrollPage(e);
    }

    animateMobileNav() {
        animate({
            elemAnimated: this.elem,
            animateCssClass: ['bounceInLeft'],
            duration: 1000
        }, () => {
            this.documentScrollFalse();
            animate({
                elemAnimated: this.elem.getElementsByTagName('li'),
                animateCssClass: ['fadeInDown', 'fast'],
                duration: 400,
                delay: 200
            })
        })
    }

    destroy() {
        document.body.classList.remove('scrollFalse');
        animate({
            elemAnimated: this.elem,
            animateCssClass: ['bounceOutLeft'],
            duration: 1000
        }, () => {
            document.body.removeChild(this.elem);
        })

    }

    documentScrollFalse() {
        document.body.classList.add('scrollFalse');
    }
}