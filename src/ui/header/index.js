'use strict';

import animate from '../../vendor/animate/animate.js';
import mainNav from '../mainNav/index.js';
import mainNavMobile from '../mainNav/mainNav-mobile.js';

import './header.scss';
import template from './header.jade';

export default class header {
    constructor(opts) {
        this.elem = document.createElement('div');
        this.elem.className = 'header-wrap';
        this.elem.innerHTML = template(opts);

        let MainNav  = new mainNav();
        this.elem.querySelector('header').appendChild(MainNav.elem);

        this.animateHeader();

        let btnNavOpen = this.elem.querySelector('.btn-mobileNavOpen');
        btnNavOpen.onclick = this.openMobileNav;

    }

    animateHeader() {
        animate({
            elemAnimated: this.elem.getElementsByTagName('li'),
            animateCssClass: ['fadeInDown'],
            duration: 1000,
            delay: 200
        }, () => {
            animate({
                elemAnimated: this.elem.querySelectorAll('span'),
                animateCssClass: ['fadeInRight', 'fast'],
                duration: 400,
                delay: 80
            });
        })
    }

    openMobileNav() {
        let MainNavMobile = new mainNavMobile();
        document.body.appendChild(MainNavMobile.elem);
    }
}