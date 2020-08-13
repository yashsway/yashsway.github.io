import {shuffleArray} from '../utilities/shuffles.js';

// used for the splash animation. Inspired by Spotify's year in rewind event sites.
export class PaintCircles {
  /**
   * @param {object} templateSvgEl must be a valid Snap svg instance
   * @param {array<string>} randomColors array of random color HEXs
   * @param {string} options.idPrefix the prefix string to use for the sequentially generated IDs of the color splotches
   */
  constructor(templateSvgEl, randomColors, options) {
    this.templateSvgEl = templateSvgEl;
    this.generatedColors = randomColors;
    this.allCircles = [];
    this.circleCount = 0;
    this.colorArray = [];
    this.colorCount = 0;
    this.options = {
      idPrefix: 'circle',
      generationIntervalInMs: 4000,
      generationIntervalCircleCount: 1,
      maxColorSequence: 6,
    };
    this.options = Object.assign(this.options, options);
    
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this.hidden = "msHidden";
      this.visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hidden = "webkitHidden";
      this.visibilityChange = "webkitvisibilitychange";
    }

    this.setup();
  }

  setup() {
    this.colorArray = this.colorArray.concat(this.generatedColors);
    this.colorArray = shuffleArray(this.colorArray);
    this.startGenerationClock(this.options.generationIntervalCircleCount, this.options.generationIntervalInMs);
    this.bindWindowFocusSwitch();
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
    window.addEventListener('focus', this.startGenerationClock.bind(this));
    window.addEventListener('blur', () => {
      this.clean();
      this.stopGenerationClock();
    });

    // NOTE: visiblity change API is currently buggy on Safari
    window.addEventListener(this.visibilityChange, () => {
      if (document[this.hidden] || document.visibilityState === 'hidden') {
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

      if (typeof id !== 'undefined' && (typeof svgID === 'undefined' || id === svgID)) {
        //Remove SVG from DOM
        document.querySelector('#' + id).remove();
        return false;
      } else {
        return true;
      }
    });

    if (this.allCircles.length === 0) {
      this.circleCount = 0;
      this.colorCount = 0;
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