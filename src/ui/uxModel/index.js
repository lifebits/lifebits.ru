'use strict';

import './uxModel.scss';

import uxModelTemplate from './uxModel.jade';

import cellDescription from './cellDescription/cellDescription.js'
import cellsList from './cellDescription/cellsList'
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
                }, function() {
                    animate({
                        elemAnimated: document.getElementById('logo'),
                        animateCssClass: 'jello',
                        duration: 1000
                    })
                })
            });
        });


        /*let CellDescription = new cellDescription(cellsList["service"]);
        document.body.appendChild(CellDescription.elem);*/

        this.elem.onclick = (e) => {
            let target = e.target;
            let button = target.closest('a');

            if (!button) return false;

            let cellId = button.dataset.cellId;


            console.log(cellsList[cellId]);

            let CellDescription = new cellDescription(cellsList[cellId]);
            document.body.appendChild(CellDescription.elem);
        };

    }


}