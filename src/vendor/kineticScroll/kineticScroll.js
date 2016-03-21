'use strict';

import './kineticScroll.scss';

var KineticScroll = {

    Init: function(container, _scrollDir) {

        var opts = {
            blurEffect: true,
            maxShiftY: 50
        };

        var dragObject = {};
        var elemKineticScrollCLass = 'kineticScroll';
        var wrapper = container.parentNode;

        var scrollDir = _scrollDir || null;

        if (opts.blurEffect) {
            container.style.webkitFilter = 'url("#blur")';
            container.style.filter = 'url("#blur")';
        }

        if (typeof window.ontouchstart !== 'undefined') {
            container.addEventListener('touchstart', onMouseDown);
            container.addEventListener('touchmove', onMouseMove);
            container.addEventListener('touchend', onMouseUp);
        } else {
            container.onmousedown = onMouseDown;
            container.onmousemove = onMouseMove;
            container.onmouseup = onMouseUp;
        }

        function onMouseDown(e) {
            if (e.which !== 1 && e.which !==0) return;

            var elem = e.target.closest('.'+elemKineticScrollCLass);
            if (!elem || elem.classList.contains("scroll-false")) return;

            dragObject.elem = elem;

            checkKineticEnergy();

            // Собираем начальные данные
            wrapper.size = {
                width: wrapper.offsetWidth,
                height: wrapper.offsetHeight
            };

            dragObject.downX = e.pageX || e.targetTouches[0].pageX;
            dragObject.downY = e.pageY || e.targetTouches[0].pageY;
            dragObject.timeStart = Date.now();

            if (!opts.startPoint) {
                opts.startPoint = getCoords(elem);
            }

            dragObject.size = {
                width: elem.offsetWidth,
                height: elem.offsetHeight
            };

            dragObject.scrollBound = {
                relativeTop: 2,
                relativeBottom: 1

            };

            dragObject.maxTranslate = {
                wrapWidth: wrapper.size.width,
                relativeTop: opts.startPoint.top + wrapper.size.height - dragObject.size.height - opts.maxShiftY,
                relativeBottom: opts.startPoint.top + opts.maxShiftY,
                relativeLeft: wrapper.size.width - calcDragElemWidth() - opts.maxShiftX,
                relativeRight: opts.startPoint.left + opts.maxShiftX
            };

            function calcDragElemWidth() {
                var dragElemWidth;
                //var childrenDragElem = dragObject.elem.getElementsByTagName('li');
                var childrenDragElem = dragObject.elem.getElementsByClassName('kineticElement');

                if (!childrenDragElem.length) return 0;

                var incElemProp = {};
                incElemProp.style = childrenDragElem[0].currentStyle || getComputedStyle(childrenDragElem[0]);
                incElemProp.width = childrenDragElem[0].offsetWidth;
                incElemProp.margin = parseFloat(incElemProp.style.marginLeft) + parseFloat(incElemProp.style.marginRight);
                incElemProp.padding = parseFloat(incElemProp.style.paddingLeft) + parseFloat(incElemProp.style.paddingRight);
                incElemProp.outerWidth = incElemProp.width + incElemProp.margin + incElemProp.padding;

                if (!opts.maxShiftX) opts.maxShiftX = incElemProp.width;

                //количество li детей * итоговую ширингу li / на количество строк и убираем погрешность от последнего, правого, отступа
                dragElemWidth = childrenDragElem.length * incElemProp.outerWidth - parseFloat(incElemProp.style.marginRight);

                return dragElemWidth;
            }

            return false;
        }


        function onMouseMove(e) {
            if (!dragObject.elem) return; // элемент не зажат

            var pageX = e.pageX || e.targetTouches[0].pageX;
            var pageY = e.pageY || e.targetTouches[0].pageY;

            if (!dragObject.avatar) { // если перенос не начат...
                var moveX = pageX - dragObject.downX;
                var moveY = pageY - dragObject.downY;

                // если мышь передвинулась в нажатом состоянии недостаточно далеко
                if (Math.abs(moveX) < 5 && Math.abs(moveY) < 5) {
                    return;
                }

                // начинаем перенос
                dragObject.avatar = createAvatar(e); // создать аватар
                if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
                    dragObject = {};
                    return;
                }

                // аватар создан успешно
                // создать вспомогательные свойства shiftX/shiftY
                var coords = getCoords(dragObject.avatar);

                dragObject.shiftX = dragObject.downX - coords.left;
                dragObject.shiftY = dragObject.downY - coords.top;

                startDrag(e); // отобразить начало переноса
            }

            // добавляем в dragObject информацию о перемещении по осям
            dragObject.moveX = pageX - dragObject.downX;
            dragObject.moveY = pageY - dragObject.downY;

            dragObject.elemOffset = getCoords(dragObject.elem); //?????

            dragObject.translateValueX = pageX - dragObject.shiftX;
            dragObject.translateValueY = pageY - dragObject.shiftY;

            if (scrollDir === "scrollX") {
                if (dragObject.translateValueX < dragObject.maxTranslate.relativeRight && dragObject.translateValueX > dragObject.maxTranslate.relativeLeft) {
                    dragObject.avatar.style.transform = 'translateX(' +dragObject.translateValueX+ 'px)';
                }
            }
            else {
                if (dragObject.maxTranslate.relativeTop < dragObject.translateValueY && dragObject.translateValueY < dragObject.maxTranslate.relativeBottom) {
                    dragObjectTransform('translateY', dragObject.translateValueY);
                }
            }

        }

        function dragObjectTransform(typeTransform, transformValue) {
            dragObject.avatar.style.transform = typeTransform + '(' +transformValue+ 'px)';
        }

        function onMouseUp(e) {
            if (dragObject.avatar) { // если перенос идет!!!!
                dragObject.avatar.bindEdge();
                translateByKineticEnergy(e);
                //finishDrag(e); - отладка центрирование по элементу
            }
            //console.dir(dragObject);
            // перенос либо не начинался, либо завершился
            // в любом случае очистим "состояние переноса" dragObject
            dragObject = {};
        }

        function startDrag(e) {
            var avatar = dragObject.avatar;

            // дополнительные действия перед началом переноса
        }

        function createAvatar() {
            var avatar = dragObject.elem;

            avatar.bindEdge = function() {

                var bindEdge = {
                    scrollX: bindEdgeWidthHorizontalScroll,
                    scrollY: bindEdgeWithVerticalScroll
                };

                function bindEdgeWidthHorizontalScroll() {
                    if ( dragObject.elemOffset.left > opts.startPoint.left ) {
                        dragObjectTransform('translateX', opts.startPoint.left);
                    }

                    if ( dragObject.elemOffset.left < dragObject.maxTranslate.relativeLeft + opts.maxShiftX) {
                        dragObjectTransform('translateX', dragObject.maxTranslate.relativeLeft + opts.maxShiftX);
                    }
                }

                function bindEdgeWithVerticalScroll() {
                    if ( dragObject.elemOffset.top > opts.startPoint.top ) {
                        dragObjectTransform('translateY', opts.startPoint.top);
                    }

                    if ( dragObject.elemOffset.top < wrapper.size.height - dragObject.size.height) {
                        dragObjectTransform('translateY', wrapper.size.height - dragObject.size.height);
                    }
                }

                return bindEdge[scrollDir]();

            };

            return avatar;
        }

        function translateByKineticEnergy() {

            var blurAnimationState;

            dragObject.timeEnd = Date.now();
            var a = 0.02;

            var timeDrag = dragObject.timeEnd - dragObject.timeStart;
            timeDrag = (timeDrag > 200) ? 0 : timeDrag;

            if ( timeDrag === 0 ) return false;

            var kineticTranslateProp = {

                scrollX: function() {
                    var speedX = dragObject.moveX/timeDrag.toFixed(6);
                    var kineticTranslateX = parseInt(dragObject.translateValueX) + speedX * timeDrag + (a * Math.pow(timeDrag, 2)/2);

                    // Проверяем чтобы далеко не укатывался за границу
                    if (kineticTranslateX > opts.startPoint.left) {
                        kineticTranslateX = opts.startPoint.left;
                    }

                    if (kineticTranslateX < dragObject.maxTranslate.relativeLeft + opts.maxShiftX) {
                        kineticTranslateX = dragObject.maxTranslate.relativeLeft + opts.maxShiftX;
                    }

                    return {
                        type: 'translateX',
                        value: kineticTranslateX
                    };
                },

                scrollY: function() {
                    var speedY = dragObject.moveY/timeDrag.toFixed(6);
                    var kineticTranslateY = parseInt(dragObject.translateValueY) + speedY * timeDrag + (a * Math.pow(timeDrag, 2)/2);

                    if (kineticTranslateY > opts.startPoint.top) kineticTranslateY = opts.startPoint.top;
                    if (kineticTranslateY < dragObject.maxTranslate.relativeTop) kineticTranslateY = dragObject.maxTranslate.relativeTop + opts.maxShiftY;

                    return {
                        type: 'translateY',
                        value: kineticTranslateY
                    };
                }

            };

            var transformProp = kineticTranslateProp[scrollDir]();

            dragObject.elem.classList.add('kinetic-energy');
            transform(transformProp.type, transformProp.value, dragObject);

            function transform(transformType, transformValue, dragObject) {
                if (opts.blurEffect) setBlurEffect();

                dragObject.elem.style.transform = transformType + '(' +transformValue+ 'px)';
                dragObject.elem.addEventListener('transitionend', function() {
                    this.classList.remove('kinetic-energy');
                    if (opts.blurEffect) cancelAnimationFrame(blurAnimationState);
                });
            }

            function setBlurEffect() {
                var dragElem = dragObject.elem;

                var filters = document.querySelector(".filters"),
                    defs = filters.querySelector("defs"),
                    blur = defs.querySelector("#blur"),
                    blurFilter = blur.firstElementChild;

                var lastPos = dragObject.elemOffset;
                var multiplier = 0.25;

                updateMotionBlur();


                function setMotionBlur(x,y){
                    blurFilter.setAttribute("stdDeviation",x+","+y);
                }

                function updateMotionBlur(){
                    // get the current position of the element
                    var currentPos = getCoords(dragElem);

                    // calculate the changes from the last frame and apply the multiplier
                    var xDiff=Math.abs(currentPos.left-lastPos.left)*multiplier;
                    var yDiff=Math.abs(currentPos.top-lastPos.top)*multiplier;

                    if (xDiff === 0) xDiff = 0.001;

                    // set the blur
                    setMotionBlur(xDiff,yDiff);

                    // store current position for the next frame
                    lastPos = currentPos;

                    // call to update in the next frame
                    blurAnimationState = requestAnimationFrame(updateMotionBlur);
                }
            }

        }

        function checkKineticEnergy() {
            if ( dragObject.elem.classList.contains('kinetic-energy') ) {
                dragObject.elem.classList.remove('kinetic-energy');
            }
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }

    }

};

export default KineticScroll;