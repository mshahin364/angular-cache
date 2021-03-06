/**
 * @doc method
 * @id DSCache.methods:setCacheFlushInterval
 * @name setCacheFlushInterval
 * @description
 * Set the `cacheFlushInterval` setting for this cache. If set, this setting will cause this cache to periodically
 * clear itself.
 *
 * ## Signature:
 * ```js
 * DSCache#setCacheFlushInterval(cacheFlushInterval)
 * ```
 *
 * ## Example:
 * ```js
 *  var cache = DSCacheFactory('cache');
 *
 *  cache.put('1', 'apple');
 *  cache.put('2', 'banana');
 *
 *  cache.info().size; // 2
 *  cache.setCacheFlushInterval(60000);
 *
 *  setTimeout(function () {
 *      cache.info().size; // 0
 *  }, 90000);
 * ```
 *
 * ## Throws:
 * - `Error` - `cacheFlushInterval` must be `null` or a number greater than zero.
 *
 * @param {number|null} cacheFlushInterval The new cacheFlushInterval for this cache in milliseconds. If
 * `cacheFlushInterval` is `null` then `cacheFlushInterval` for this cache will be reset to the default (`null`).
 */
module.exports = function setCacheFlushInterval(cacheFlushInterval) {
  var _this = this;
  if (cacheFlushInterval === null) {
    delete _this.$$cacheFlushInterval;
  } else if (!angular.isNumber(cacheFlushInterval)) {
    throw angular.$$minErr('ng')('areq', 'Expected cacheFlushInterval to be a number! Found: {0}.', typeof cacheFlushInterval);
  } else if (cacheFlushInterval < 0) {
    throw angular.$$minErr('ng')('areq', 'Expected cacheFlushInterval to be greater than zero! Found: {0}.', cacheFlushInterval);
  } else if (cacheFlushInterval !== _this.$$cacheFlushInterval) {
    _this.$$cacheFlushInterval = cacheFlushInterval;
    clearInterval(_this.$$cacheFlushIntervalId);
    (function (self) {
      self.$$cacheFlushIntervalId = setInterval(function () {
        self.removeAll();
      }, self.$$cacheFlushInterval);
    })(_this);
  }
};
