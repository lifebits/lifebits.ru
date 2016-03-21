'use strict';

import './cardDeck.scss';

import templateCardDeck from './cardDeck.jade';
import templateCardList from './cards.jade';

import KineticScroll from '../../vendor/kineticScroll/kineticScroll.js';
import animate from '../../vendor/animate/animate.js';

export default class cardDeck {
    constructor(opts) {
        let self = this;

        this.elem = document.createElement('section');
        this.elem.className = 'wrap-cardDeck';
        this.elem.innerHTML = templateCardDeck(opts);

        this.currentState = "default";

        this.cardContainer = this.elem.getElementsByClassName('cardDeck')[0];
        this.kineticContainer = this.elem.getElementsByClassName('kineticScroll')[0];

        this.stateList = {
            fullSizeMode(toggle) {
                self.fullSizeMode(toggle, opts)
            },
            cardInfoMode(toggle) {
                self.cardInfoMode(toggle)
            }
        };

        //let kineticContainer = this.elem.getElementsByClassName('kineticScroll')[0];
        KineticScroll.Init(this.kineticContainer, "scrollX");

        //навешиваем эвенты
        let btnWrap = this.elem.querySelector('.btn-wrap');
        btnWrap.onclick = (e) => {

            let target = e.target;
            let button = target.closest('a');

            if (!button) return false;

            let event = button.getAttribute('data-event');
            let newState = event;

            //Clear button state
            let buttonList = this.elem.getElementsByTagName('a');
            for (let i=0; i<buttonList.length; i++) {
                buttonList[i].classList.remove('active');
            }


            if ( newState == this.currentState ) {
                this.stateList[newState]("removeState");
                this.currentState = 'default';

                button.classList.remove('active');
                return false
            }

            if ( newState !== this.currentState ) {
                let currentStateList = this.elem.classList;

                //normalize state
                for (let i=0; i<currentStateList.length; i++) {
                    let state = currentStateList[i];
                    if (state !== 'wrap-cardDeck') {
                        self.stateList[state]('removeState');
                    }
                }

                this.currentState = newState;
                this.stateList[newState]('setState');
                button.classList.add('active');
            }

        }

    }



    fullSizeMode(toggle, opts) {
        let cardDeck = this.elem;
        let cardContainer = this.cardContainer;
        let animatedElemList = cardContainer.getElementsByClassName('kineticElement');

        if (toggle == "setState") {
            setFullScreen()
        } else {
            resetFullScreen()
        }

        function setFullScreen() {
            cardDeck.classList.add('fullSizeMode');

            opts.itemsDir = 'fullSize';
            cardContainer.innerHTML = templateCardList(opts);

            animate({
                elemAnimated: animatedElemList,
                animateCssClass: 'fadeInRight',
                duration: 800,
                delay: 300
            });
        }

        function resetFullScreen() {
            cardDeck.classList.remove('fullSizeMode');
            animate({
                elemAnimated: animatedElemList,
                animateCssClass: ['fast','fadeInRight'],
                duration: 400,
                delay: 100
            });
        }
    }

    cardInfoMode(toggle) {
        let self = this;
        let cardDeck = self.elem;
        let ulList = cardDeck.getElementsByTagName('ul');

        if (toggle == "setState") {
            setCardInfoMode()
        } else {
            resetCardInfoMode()
        }

        function setCardInfoMode() {
            cardDeck.classList.add('cardInfoMode');

            for (let i=0; i<ulList.length; i++) {
                let ul = ulList[i];
                ul.classList.add('container');
            }

            self.kineticContainer.classList.add('scroll-false');
            self.kineticContainer.style.transform = 'translateX(0px)';
        }

        function resetCardInfoMode() {
            cardDeck.classList.remove('cardInfoMode');

            for (let i=0; i<ulList.length; i++) {
                let ul = ulList[i];
                ul.classList.remove('container');
            }

            self.kineticContainer.classList.remove('scroll-false');
        }
    }

}
