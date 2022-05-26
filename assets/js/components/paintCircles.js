import {shuffleArray} from '../utilities/shuffles.js';

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
      areaCoveredThreshold: 90,
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
    this.generateRandomCircles(numCirclesToGenerate);
    // start generating circles every interval
    this.generationInterval = setInterval(() => this.generateRandomCircles(numCirclesToGenerate), interval);
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
   * Binds animation to SVG circle of a certain ID
   * @param {object} snapSvgInstance valid Snap svg object
   * @param {string} svgID ID of the SVG to target
   */
  animateCircle(snapSvgInstance, svgID) {
    snapSvgInstance.animate({
        //scale
        r: 800
    },
    10000,
    mina.easeInOut,
    () => {
        //Fade to 0 opacity after scale is complete
        snapSvgInstance.animate({
          opacity: 0
        }, 2500, mina.linear, () => {
          // remove from DOM
          let domInstance = document.querySelector('#' + snapSvgInstance.attr('id'));

          if (domInstance) {
            domInstance.remove();
          }

          // remove from storage
          this.circlesInCanvas.splice(this.circlesInCanvas.indexOf(snapSvgInstance), 1);
        });
    });
  }

  // store SVG object and bind animation
  storeCircle(snapSvgObj, svgID) {
    this.circlesInCanvas.push(snapSvgObj);
    this.animateCircle(snapSvgObj, svgID);
  }

  // random color sequence
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

  // generate color circles in random locations of the visible screen
  generateRandomCircles(numCirclesToGenerate = 3) {
    for (let i = 0; i < numCirclesToGenerate; i++) {
      //Extract viewport dimensions
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      //Assign random location
      const x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + 1);
      const y = Math.floor((Math.random() * screenHeight) + 1) + 1;
      //Generate unique ID for every circle
      const uniqueID = this.generateID();
      
      this.storeCircle(
        this.templateSvgEl.circle(x, y, 1).attr({
            fill: this.getSequentialRandomColor(),
            id: uniqueID
        }),
        uniqueID
      );
    }
  }
}