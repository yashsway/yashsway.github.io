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
  * @param {number} options.maxColorSequence # of circles after which to change color (switch cycles)
  * @returns {object} a PaintCircles instance with all its methods and properties, that can be instantiated just by calling the constructor
  */
export class PaintCircles {
  constructor(templateSvgEl, randomColors, options) {
    this.templateSvgEl = templateSvgEl;
    this.canvasArea = 0;
    this.generatedHexColors = randomColors;
    this.circlesInCanvas = [];
    this.hexColors = [];
    this.whichGeneratedCircleInSequence = 1;
    this.whichColorInSequence = 1;
    this.options = {
      idPrefix: 'circle',
      generationIntervalInMs: 4000,
      generationIntervalCircleCount: 1,
      maxColorSequence: 6,
    };
    this.options = Object.assign(this.options, options);
    this.documentHiddenProperty = 'hidden';
    this.visibilityChangeEvent = 'visibilityChangeEvent';
    
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
      this.documentHiddenProperty = 'hidden';
      this.visibilityChangeEvent = 'visibilityChangeEvent';
    } else if (typeof document.msHidden !== 'undefined') {
      this.documentHiddenProperty = 'msHidden';
      this.visibilityChangeEvent = 'msvisibilityChangeEvent';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.documentHiddenProperty = 'webkitHidden';
      this.visibilityChangeEvent = 'webkitvisibilityChangeEvent';
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
    return 2 * Math.PI * radius;
  }

  calculatePercentageCoveredOfCanvas(parentArea, childArea) {
    return (childArea / parentArea) * 100;
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
    window.addEventListener(this.visibilityChangeEvent, () => {
      if (document[this.documentHiddenProperty] || document.visibilityState === 'hidden') {
        this.clean();
        this.stopGenerationClock(); 
      } else {
        this.startGenerationClock();
      }
    });
  }

  /**
   * Simple ID gen appends an inc count on every call
   * @returns {string} ever increasing ID
   */
  generateID() {
    return this.options.idPrefix + (this.circlesInCanvas.length + 1);
  }
  
  /**
   * Remove a circle from the cache
   * @param {string} svgID ID of the circle
   */
  clean(svgID) {
    this.circlesInCanvas = this.circlesInCanvas.filter(circleEl => {
      let id = circleEl.attr('id');

      if (typeof id !== 'undefined' && (typeof svgID === 'undefined' || id === svgID)) {
        //Remove SVG from DOM
        document.querySelector('#' + id).remove();
        return false;
      } else {
        return true;
      }
    });

    if (this.circlesInCanvas.length === 0) {
      this.whichGeneratedCircleInSequence = 1;
    }
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
    20000,
    mina.easeInOut,
    () => {
        //Fade to 0 opacity after scale is complete
        snapSvgInstance.animate({
          opacity: 0
        }, 10000, mina.easeInOut, () => {
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
  getSequentialRandomColor(interval = 7) {
    if (this.whichGeneratedCircleInSequence % interval === 0) {
      this.whichColorInSequence += 1;
    }

    if (this.whichGeneratedCircleInSequence > this.hexColors.length) {
      let cachedColor = this.hexColors[this.whichColorInSequence - 1];
      //Shuffle colors when the end of the color array is reached
      this.hexColors = shuffleArray(this.hexColors);
      //Restart, but keep track of the interval
      this.whichGeneratedCircleInSequence = Math.abs(this.hexColors.length - interval);
      //Return color stored from earlier
      return cachedColor;
    }

    return this.hexColors[this.whichColorInSequence - 1];
  }

  // generate color circles in random locations of the visible screen
  generateRandomCircles(count = 3) {
    for (let i = 0; i < count; i++) {
      //Extract viewport dimensions
      const screenHeight = window.innerHeight
      const screenWidth = window.innerWidth;
      //Assign random location
      let x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + 1);
      let y = Math.floor((Math.random() * screenHeight) + 1) + 1;
      //Generate unique ID for every circle
      let uniqueID = this.generateID();
      
      this.storeCircle(
        (this.templateSvgEl.circle(x, y, 1)).attr({
            fill: this.getSequentialRandomColor(this.options.maxColorSequence),
            id: uniqueID
        }),
        uniqueID
      );
      this.whichGeneratedCircleInSequence += 1;
    }
  }
}