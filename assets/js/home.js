'use strict';
import {PaintCircles} from './components/paintCircles.js';

(function init() {
  new PaintCircles(Snap('#circleLoader'), randomColor({ luminosity: 'light', count: 10 }));
})();