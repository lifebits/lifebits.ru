'use strict';

import './cellDescription.scss';
import cellDescriptionTemplate from './cellDescription.jade';

import animate from '../../../vendor/animate/animate.js'


export default class cellDescription {
    constructor(opts) {

        this.elem = document.createElement('div');
        this.elem.className = 'wrap-cellDescription';
        this.elem.innerHTML = cellDescriptionTemplate(opts);

        let leftSide = this.elem.querySelector('.leftSide');
        let rightSide = this.elem.querySelector('.rightSide');

        animate({
            elemAnimated: leftSide,
            animateCssClass: ['slideInLeft', 'fast'],
            duration: 500
        }, function() {
            animate({
                elemAnimated: leftSide.getElementsByClassName('cell'),
                animateCssClass: 'flipInY',
                duration: 1000,
                delay: 200
            });
        });

        animate({
            elemAnimated: rightSide,
            animateCssClass: ['slideInRight', 'fast'],
            duration: 500
        });


        let btnClose = this.elem.querySelector('.btn-close');
        btnClose.onclick = () => {
            let thisElem = this.elem;

            animate({
                elemAnimated: leftSide,
                animateCssClass: ['slideOutLeft', 'fast'],
                duration: 500
            });

            animate({
                elemAnimated: rightSide,
                animateCssClass: ['slideOutRight', 'fast'],
                duration: 500
            }, function() {
                document.body.removeChild(thisElem);
            });

        };



    }
}