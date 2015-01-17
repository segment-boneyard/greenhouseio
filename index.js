
var debug = require('debug')('github:scraper');
var request = require('superagent');

/**
 * Expose the `Greenhouse`.
 */

module.exports = Greenhouse;

/**
 * Initialize a `Greenhouse` instance.
 *
 * @param {Object} options
 *    @param {String} apiKey
 */

function Greenhouse (options) {
  if (!(this instanceof Greenhouse)) return new Greenhouse();
  this.options = options;
}

/**
 * Create a new Greenhouse candidate
 *
 * @param {Object} candidate
 * @param {Function} callback
 */

Greenhouse.prototype.createCandidate = function (candidate, callback) {
  var url = 'https://api.greenhouse.io/v1/partner/candidates';
  request
    .post(url)
    .set('Content-Type', 'application/json')
    .set('On-Behalf-Of', this.options.email)
    .auth(this.options.apiKey, '')
    .send(candidate)
    .end(callback);
};

/**
 * Get a Greenhouse candidate
 *
 * @param {String} id
 * @param {Function} callback
 */

Greenhouse.prototype.getCandidate = function (id, callback) {
  var url = 'https://api.greenhouse.io/v1/partner/candidates';
  request
    .get(url)
    .query('candidate_ids', id)
    .set('Accept', 'application/json')
    .auth(this.options.apiKey, '')
    .end(callback);
};
