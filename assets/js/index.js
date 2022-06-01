'use strict';
import {PaintCircles} from './components/paintCircles.js';
import Snap from 'snapsvg';
import randomColor from 'randomcolor';

window.addEventListener('load', () => {
  new PaintCircles(Snap('#circleCanvas'), randomColor({ luminosity: 'light', count: 10 }));
});