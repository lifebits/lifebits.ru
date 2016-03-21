'use strict';

import './siteReview.scss';

import template from './siteReview.jade';
import pageNavTemplate from './pageNav.jade';

import animate from '../../vendor/animate/animate.js';

export default class siteReview {
    constructor(opts) {

        this.elem = document.createElement('section');
        this.elem.className = 'wrap-siteReview';
        this.elem.innerHTML = template(opts.index);

        this.siteReviewContainer = this.elem.getElementsByClassName('siteReview')[0];

        this.constructPageNav(opts);

        this.siteReviewContainer.onclick = (e) => {
            let imgScrollNav = this.siteReviewContainer.getElementsByClassName('img-scroll-nav')[0];
            let imgContainer = this.elem.getElementsByClassName('img-scroll')[0];
            let imgScroll = imgContainer.getElementsByTagName('img')[0];

            let target = e.target;
            let button = target.closest('li');

            if (!button) return false;


            let buttonList = imgScrollNav.getElementsByTagName('li');
            siteReview.clearButtonActiveState(buttonList);

            button.classList.add('active');

            let translateValue = button.getAttribute('data-value');
            imgScroll.style.transform = 'translateY(-'+translateValue+'px)';
        };


    }

    static clearButtonActiveState(buttonList) {
        for (let i=0; i<buttonList.length; i++) {
            buttonList[i].classList.remove('active');
        }
    }

    constructPageNav(opts) {
        let siteReviewContainer = this.siteReviewContainer;

        let pageNav = document.createElement('div');
            pageNav.className = 'wrap-pageNav';
            pageNav.innerHTML = pageNavTemplate(opts);

        this.elem.appendChild(pageNav);

        pageNav.onclick = (e) => {
            let target = e.target;
            let button = target.closest('a');

            if (!button) return false;

            let buttonList = pageNav.getElementsByTagName('a');
            siteReview.clearButtonActiveState(buttonList);

            button.classList.add('active');

            let pageName = button.getAttribute('data-page');
            siteReviewContainer.innerHTML = template(opts[pageName]);

            animateSectionNav();
        };


        function animateSectionNav() {
            let sectionNav = siteReviewContainer.querySelector('.img-scroll-nav');
            let animatedElemList = sectionNav.getElementsByTagName('li');

            animate({
                elemAnimated: animatedElemList,
                animateCssClass: ['fadeInUp', 'fast'],
                duration: 400,
                delay: 100
            });

            let line = sectionNav.querySelector('.line');
            animate({
                elemAnimated: line,
                animateCssClass: ['fadeInUp', 'fast'],
                duration: 400
            });
        }
    }
}
