'use strict';

import './animate.scss'

/*
animate({
    elemAnimated: animatedElemList,
    animateCssClass: ['fadeInRight', 'fast'],
    duration: 400,
    delay: 80,
    postponeAnimation: 1000
}, function() {
    // A function to call once the animation is complete.
});
*/

export default function (opts, complete) {

    let animatedElements = opts.elemAnimated;
    let animatedCssClasses = opts.animateCssClass;
    let postponeAnimation = opts.postponeAnimation || 0; //Отложить старт анимации в мс
    let duration = opts.duration || 1000;
    let delay = opts.delay || 0;
    let numberElements = animatedElements.length; //Кол-во цепочек в анимации


    if (numberElements) {
        for (let i = 0; i < animatedElements.length; i++) {
            let elemNumber = i;
            let currentElement = animatedElements[i];

            let startAnimate = performance.now() + postponeAnimation + delay * elemNumber;
            let endAnimate = startAnimate + duration;

            startAnimation(currentElement, startAnimate, endAnimate, elemNumber);
        }
    } else {
        numberElements = 1;
        let elemNumber = 0;
        let currentElement = animatedElements;
        let startAnimate = performance.now() + postponeAnimation;
        let endAnimate = startAnimate + duration;

        startAnimation(currentElement, startAnimate, endAnimate, elemNumber);
    }



    function startAnimation(currentElement, startAnimate, endAnimate, elemNumber) {

        updateAnimation();

        function setAnimation() {
            if (!currentElement.classList.contains('animated')) {
                currentElement.classList.remove('invisible');
                currentElement.classList.add('animated');

                if (is_array(animatedCssClasses)) {
                    animatedCssClasses.forEach(function(item) {
                        currentElement.classList.add(item);
                    });
                } else {
                    currentElement.classList.add(animatedCssClasses);
                }
            }
        }

        function removeAnimation() {
            currentElement.classList.remove('animated');

            if (is_array(animatedCssClasses)) {
                animatedCssClasses.forEach(function(item) {
                    currentElement.classList.remove(item);
                });
            } else {
                currentElement.classList.remove(animatedCssClasses)
            }
        }

        function updateAnimation() {
            let currentTime = performance.now();

            if (currentTime >= startAnimate) {
                setAnimation();
            }

            if (currentTime < endAnimate) {
                requestAnimationFrame(updateAnimation);
            }

            if (currentTime >= endAnimate) {
                removeAnimation();
                if (complete && numberElements == elemNumber+1) {
                    complete();
                }
            }
        }

    }

    function is_array(a) {
        return (typeof a == "object") && (a instanceof Array);
    }

}