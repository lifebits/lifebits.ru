'use strict';

import './footer.scss';

import template from './footer.jade';

export default class footer {
    constructor(opts) {
        this.elem = document.createElement('div');
        this.elem.className = 'footer-wrap';

        this.elem.innerHTML = template(opts);
    }
}