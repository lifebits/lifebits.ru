'use strict';

import template from './mainNav.jade';

export default class {
    constructor() {
        this.elem = document.createElement('nav');
        this.elem.innerHTML = template();

        this.elem.onclick = this.scrollPage;
    }

    scrollPage(e) {
        let target = e.target;
        let button = target.closest('li');

        if (!button) return false;

        let a = button.querySelector('a');

        let sectionId = a.dataset['sectionId'];
        let currentSection = document.getElementById(sectionId);

        let currentSectionOffsetTop = currentSection.offsetTop;
        let windowHeight = document.documentElement.clientHeight;

        window.scrollTo(0, currentSectionOffsetTop-windowHeight/4); //попадание в четверть экрана
    }
}