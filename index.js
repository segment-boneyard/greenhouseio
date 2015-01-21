
var debug = require('debug')('greenhouse:client');
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
  if (!candidate.first_name) throw new Error('first_name is a required field for candidates');
  if (!candidate.last_name) throw new Error('last_name is a required field for candidates');
  if (!candidate.external_id) throw new Error('external_id is a required field for candidates');
  if (!candidate.job_id) throw new Error('job_id is a required field for candidates');
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
  var url = 'https://api.greenhouse.io/v1/partner/candidates?candidate_ids=' + id;
  request
    .get(url)
    .set('Accept', 'application/json')
    .set('On-Behalf-Of', this.options.email)
    .auth(this.options.apiKey, '')
    .end(callback);
};
