/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

/**
 * Cache window.
 *
 * @constant
 * @type {Object}
 */
export const $window = window;

/**
 * Window width.
 *
 * @constant
 * @type {Number}
 */
export const winWidth = $window.innerWidth;

/**
 * Match media device indicator.
 */
export class Resp {
	/**
	 * Get window's current width.
	 *
	 * @get
	 * @static
	 * @return {Number}
	 */
	static get currWidth() {
		return window.innerWidth;
	}
	
	/**
	 * Detect touch events.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTouch() {
		return 'ontouchstart' in window;
	}
	
	/**
	 * Detect desktop device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isDesk() {
		return window.matchMedia(`(min-width: 1200px)`).matches;
	}
	
	/**
	 * Detect tablet device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isTablet() {
		return window.matchMedia(`(min-width: 768px) and (max-width: 1279px)`).matches;
	}
    /**
     * Detect smart device.
     *
     * @get
     * @static
     * @return {Boolean}
     */
    static get isSmart() {
        return window.matchMedia(`(min-width: 18px) and (max-width: 1279px)`).matches;
    }
	
	/**
	 * Detect mobile device.
	 *
	 * @get
	 * @static
	 * @return {Boolean}
	 */
	static get isMobile() {
		return window.matchMedia(`(max-width: 767px)`).matches;
	}
}

/**
 * Transform json date-format from 'ymd' at 'hm'
 *
 * @param {number} json-date
 * @return {string} a date
 */
export const getCreateDate = (date) => {
    let nDate = new Date(Date.parse(date.replace(/( \+)/, ' UTC$1')));
    let ymd = nDate.getFullYear() + '-' + ('0' + (nDate.getMonth() + 1)).slice(-2) + '-' + ('0' + nDate.getDate()).slice(-2);
    let hm = `${nDate.getHours()}:${nDate.getMinutes()}`;
    return `${ymd} at ${hm}`;
}