'use strict';
import {PaintCircles} from './components/paintCircles.js';
import randomColor from 'randomcolor';

window.addEventListener('load', () => {
  new PaintCircles(Snap('#circleCanvas'), randomColor({ luminosity: 'light', count: 10 }));
});