import {shuffleArray} from '../utilities/shuffles.js';

// used for the splash animation. Inspired by Spotify's year in rewind event sites.
export class PaintCircles {
  // usually caps around twice the interval
  allCircles = [];
  circleCount = 0;
  colorArray = [];
  colorCount = 0;
  generatedColors;
  templateSvgEl;
  generationInterval;
  options = {
    idPrefix: 'circle',
    generationIntervalInMs: 3000,
    generationIntervalCircleCount: 1,
    maxColorSequence: 6,
  };

  /**
   * @param {object} templateSvgEl must be a valid Snap svg instance
   * @param {array<string>} randomColors array of random color HEXs
   * @param {string} options.idPrefix the prefix string to use for the sequentially generated IDs of the color splotches
   */
  constructor(templateSvgEl, randomColors, options) {
    this.templateSvgEl = templateSvgEl;
    this.generatedColors = randomColors;
    this.options = Object.assign(this.options, options);

    this.setup();
  }

  setup() {
    this.colorArray = this.colorArray.concat(this.generatedColors);
    this.colorArray = shuffleArray(this.colorArray);
    this.startGenerationClock(this.options.generationIntervalCircleCount, this.options.generationIntervalInMs);
  }

  teardown() {
    this.templateSvgEl.remove();
    this.stopGenerationClock();
  }

  startGenerationClock(numCirclesToGenerate = 1, interval = 3000) {
    //Start generating circles every 3 seconds.
    this.generationInterval = setInterval(() => this.generateRandomCircles(numCirclesToGenerate), interval);
  }

  stopGenerationClock() {
    window.clearInterval(this.generationInterval);
  }

  bindWindowFocusSwitch() {
    // keep track of whether the browser tab or window is in focus. If not, pause animations and other background js processes for performance
    window.addEventListener('focus', this.startGenerationClock);
    window.addEventListener('blur', this.stopGenerationClock);
  }

  /**
   * Simple ID gen appends an inc count on every call
   * @returns {string} ever increasing ID
   */
  generateID() {
    this.circleCount += 1;
    return this.options.idPrefix + this.circleCount;
  }
  
  /**
   * Remove a circle from the cache
   * @param {string} svgID ID of the circle
   */
  clean(svgID) {
    this.allCircles = this.allCircles.filter(circleEl => {
      let id = circleEl.attr('id');

      if (typeof id !== 'undefined' && id === svgID) {
        //Remove SVG from DOM
        document.querySelector('#' + circleEl.attr('id')).remove();
        return false;
      } else {
        return true;
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
    20000,
    mina.easeInOut,
    () => {
        //Fade to 0 opacity after scale is complete
        snapSvgInstance.animate({
            opacity: 0
        }, 15000, mina.easeInOut, () => {
            //Remove SVG circle from DOM
            document.querySelector('#' + snapSvgInstance.attr('id')).remove();
            //Remove SVG circle from storage
            this.allCircles.splice(this.allCircles.indexOf(this), 1);
        });
    });
  }

  // store SVG object and bind animation
  storeCircle(snapSvgObj, svgID) {
    this.allCircles.push(snapSvgObj);
    this.animateCircle(snapSvgObj, svgID);
  }

  // random color sequence
  sequentialRandomColor(interval = 7) {
    if (this.colorCount <= interval) {
      this.colorCount += 1;
      return this.colorArray[0];
    } else if (this.colorCount <= interval * 2) {
      this.colorCount += 1;
      return this.colorArray[1];
    } else if (this.colorCount <= interval * 3) {
      this.colorCount += 1;
      return this.colorArray[2];
    } else if (this.colorCount > interval * 3) {
        let cachedColor = this.colorArray[2];
        //Shuffle colors when max (interval*3) is reached
        this.colorArray = shuffleArray(this.colorArray);
        //Restart
        this.colorCount = 0;
        //Return color stored from earlier
        return cachedColor;
    } else {
      return '#000';
    }
  }

  // generate color circles in random locations of the visible screen
  generateRandomCircles(count = 3) {
    for (let i = 0; i < count; i++) {
      //Extract viewport dimensions
      const screenHeight = window.innerHeight
      const screenWidth = window.innerWidth;
      //Assign random location
      let x = Math.floor(Math.random() * ((screenWidth - 0) + 1) + (1));
      let y = Math.floor((Math.random() * screenHeight) + 1) + 1;
      //Generate unique ID for every circle
      let uniqueID = this.generateID();
      
      this.storeCircle(
          (this.templateSvgEl.circle(x, y, 1)).attr({
              fill: this.sequentialRandomColor(this.options.maxColorSequence),
              id: uniqueID
          }),
          uniqueID
      );
    }
  }
}