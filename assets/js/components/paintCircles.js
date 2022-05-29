import {shuffleArray} from '../utilities/shuffles.js';
import sleep from '../utilities/sleep.js';

/**
  Creates circles of a random color in a canvas continuously over time, that expand from nothing to a certain size, 
  till they cover enough of the canvas, at which point, the cycle begins again with circles of a new color.

  Used for the splash animation. 
  Inspired by Spotify's year in rewind event sites.

  * @param {object} templateSvgEl must be a valid Snap svg instance
  * @param {array<string>} randomColors array of random color HEXs
  * @param {string} options.idPrefix the prefix string to use for the sequentially generated IDs of the color splotches
  * @param {number} options.generationIntervalInMs time to wait between circle generation
  * @param {number} options.generationIntervalCircleCount # of circles to generate every interval
  * @param {number} options.areaCoveredThreshold circles expand within the templateSvgEl until this % area is reached. Then the color is changed. (switch cycles)
  * @returns {object} a PaintCircles instance with all its methods and properties, that can be instantiated just by calling the constructor
  */
export class PaintCircles {
  constructor(templateSvgEl, randomColors, options) {
    this.templateSvgEl = templateSvgEl;
    this.canvasArea = 0;
    this.generatedHexColors = randomColors;
    this.circlesInCanvas = [];
    this.hexColors = [];
    this.whichColorInSequence = 1;
    this.options = {
      idPrefix: 'circle',
      generationIntervalInMs: 4000,
      generationIntervalCircleCount: 1,
      areaCoveredThreshold: 95,
    };
    this.options = Object.assign(this.options, options);
    this.documentHiddenProperty = 'hidden';
    this.visibilityChangeEvent = 'visibilitychange';
    
    if (typeof document.hidden !== 'undefined') {
      this.documentHiddenProperty = 'hidden';
      this.visibilityChangeEvent = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.documentHiddenProperty = 'msHidden';
      this.visibilityChangeEvent = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.documentHiddenProperty = 'webkitHidden';
      this.visibilityChangeEvent = 'webkitvisibilitychange';
    }

    this.setup();
  }

  setup() {
    this.canvasArea = this.calculateAreaOfCanvas(this.templateSvgEl.node);
    this.hexColors = this.hexColors.concat(this.generatedHexColors);
    this.hexColors = shuffleArray(this.hexColors);
    this.startGenerationClock(this.options.generationIntervalCircleCount, this.options.generationIntervalInMs);
    this.bindWindowFocusSwitch();
  }

  teardown() {
    this.templateSvgEl.remove();
    this.stopGenerationClock();
  }

  calculateAreaOfCanvas(canvasEl) {
    let dimensions = canvasEl.getBoundingClientRect();

    if (!dimensions) {
      return;
    }

    return dimensions.height * dimensions.width;
  }

  calculateAreaOfCircle(radius) {
    return Math.PI * Math.round(radius) * Math.round(radius);
  }

  calculatePercentageCoveredOfCanvas(childArea, parentArea) {
    return (childArea / parentArea) * 100;
  }

  isEnoughOfCanvasCoveredByColor(hexColorToCheck) {
    if (!this.circlesInCanvas.length) {
      return false;
    }

    let roughAreaCovered = this.circlesInCanvas
      .filter(circle => circle.node.getAttribute('fill') === hexColorToCheck)
      .map(circle => this.calculateAreaOfCircle(parseInt(circle.attr('r'))))
      .reduce((prevArea, currArea) => prevArea + currArea, 0);

    return this.calculatePercentageCoveredOfCanvas(roughAreaCovered, this.canvasArea) > 95;
  }

  startGenerationClock(numCirclesToGenerate = 1, interval = 3000) {
    // generate one circle immediately
    this.generateCircles(numCirclesToGenerate);
    // start generating circles every interval
    this.generationInterval = setInterval(() => this.generateCircles(numCirclesToGenerate), interval);
  }

  stopGenerationClock() {
    window.clearInterval(this.generationInterval);
  }

  bindWindowFocusSwitch() {
    // keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
    window.addEventListener('focus', this.startGenerationClock.bind(this));
    window.addEventListener('blur', () => {
      this.clean();
      this.stopGenerationClock();
    });

    // NOTE: visiblity change API is currently buggy on Safari
    document.addEventListener(this.visibilityChangeEvent, () => {
      this.clean();

      if (document[this.documentHiddenProperty] || document.visibilityState === 'hidden') {
        this.stopGenerationClock(); 
      } else {
        this.startGenerationClock();
      }
    });
  }

  /**
   * Simple ID gen using current time
   * @returns {string} a string that can be used as an element ID
   */
  generateID() {
    return this.options.idPrefix + Date.now();
  }
  
  /**
   * Remove all circles
   * @returns {void}
   */
  clean() {
    if (this.circlesInCanvas.length === 0) {
      this.whichColorInSequence = 1;
      return;
    }

    this.circlesInCanvas.forEach(circle => {
      // Remove svg from DOM
      document.querySelector('#' + circle.attr('id')).remove();
    });
    this.circlesInCanvas = [];
    this.whichColorInSequence = 1;
  }

  /**
   * Remove circles that satisfy a condition
   * @param {function} conditionFunc the circle Snap.svg object is passed as an argument
   * @returns {void}
   */
  cleanBasedOnCondition(conditionFunc = (circle) => !!circle) {
    if (this.circlesInCanvas.length === 0) {
      this.whichColorInSequence = 1;
      return;
    }

    this.circlesInCanvas = this.circlesInCanvas.filter(circle => {
      if (conditionFunc(circle)) {
        return true;
      } else {
        // Remove svg from DOM
        document.querySelector('#' + circle.attr('id')).remove();
        return false;
      }
    });
  }

  /**
   * Animates a circle to grow, pause for a little while, fade out, then remove itself from local store and the DOM
   * @param {object} snapSvgInstance 
   */
  animateCircle(snapSvgInstance) {
    this
      .growCircle(snapSvgInstance, 10000)
      .then(() => sleep(5000))
      .then(() => this.fadeCircle(snapSvgInstance, 1000))
      .then(() => {
        // Then delete the instance completely from the DOM and store
        // remove from DOM
        let domInstance = document.querySelector('#' + snapSvgInstance.attr('id'));

        if (domInstance) {
          domInstance.remove();
        }

        // remove from storage
        this.circlesInCanvas.splice(this.circlesInCanvas.indexOf(snapSvgInstance), 1);
      });
  }

  /**
   * Makes an SVG circle grow to fill the space of the templateSvgEl
   * @param {object} snapSvgInstance valid Snap svg object
   * @param {number} durationInMs how long should the animation happen for?
   */
  growCircle(snapSvgInstance, durationInMs = 10000) {
    const sizeToScaleTo = Math.max(this.templateSvgEl.node.clientWidth, this.templateSvgEl.node.clientHeight) / 1.25;

    return new Promise((resolve, reject) => {
      snapSvgInstance.animate(
        {
          //target radius
          r: sizeToScaleTo
        },
        durationInMs,
        mina.easeInOut,
        () => resolve(snapSvgInstance)
      );
    });
  }

  /**
   * Makes a Snap SVG circle fade out
   * @param {object} snapSvgInstance  valid Snap svg object
   * @param {number} durationInMs how long should the animation happen for?
   */
  fadeCircle(snapSvgInstance, durationInMs = 1000) {
    return new Promise((resolve, reject) => {
      //Fade to 0 opacity after scale is complete
      snapSvgInstance.animate(
        {
          opacity: 0
        },
        durationInMs,
        mina.linear,
        () => resolve(snapSvgInstance)
      );
    });
  }

  // store SVG object in store
  storeCircle(snapSvgObj) {
    this.circlesInCanvas.push(snapSvgObj);
  }

  /**
   * Gets the current color in the color sequence, unless we're at the end of the sequence
   * in which case we shuffle the sequence and start over. If enough of the canvas is covered with one color
   * we increment to the next color in the sequence.
   * @returns {string} HEX color
   */
  getSequentialRandomColor() {
    let currentHexColor = this.hexColors[this.whichColorInSequence - 1];

    if (this.whichColorInSequence >= (this.hexColors.length - 1)) {
      this.hexColors = shuffleArray(this.hexColors);
      this.whichColorInSequence = 1;
    }

    if (this.isEnoughOfCanvasCoveredByColor(currentHexColor)) {
      this.whichColorInSequence += 1;
      return this.hexColors[this.whichColorInSequence - 1];
    }

    return currentHexColor;
  }

  /**
   * Get random viewport coordinates from the template SVG element
   * @returns {array} x and y coordinate array
   */
  getRandomViewportCoordinate() {
    //Extract viewport dimensions
    const screenHeight = this.templateSvgEl.node.clientHeight;
    const screenWidth = this.templateSvgEl.node.clientWidth;
    //Assign random location
    const x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + 1);
    const y = Math.floor((Math.random() * screenHeight) + 1) + 1;

    return [x, y];
  }

  /**
   * Generates circles at random coordinates specified by the getCoordinates function, stores them in local store, and animates them
   * @param {number} numCirclesToGenerate the number of circles to generate
   * @param {function} getCoordinates function that returns an x,y coordinate for the circle to be generated
   */
  generateCircles(numCirclesToGenerate = 3, getCoordinates = this.getRandomViewportCoordinate.bind(this)) {
    for (let i = 0; i < numCirclesToGenerate; i++) {
      //Coordinates for generation origin
      const [x, y] = getCoordinates();
      //Generate unique ID for every circle
      const uniqueID = this.generateID();
      //Create circle instance
      const circleInstance = this.templateSvgEl
        .circle(x, y, 1)
        .attr({
          fill: this.getSequentialRandomColor(),
          id: uniqueID
        });
      
      this.storeCircle(circleInstance);
      this.animateCircle(circleInstance);
    }
  }
}