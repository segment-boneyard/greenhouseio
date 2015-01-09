
var assert = require('assert');
var Greenhouse = require('..');
var conf = require('./conf');

describe('greenhouse', function () {

  it('should create a prospect', function (done) {
    var candidate = {
      first_name: 'Johnny',
      last_name: 'Appleseed',
      emails: ['johnny@apples.co'],
      websites: [
        {
          url: 'https://github.com/appleseed',
          type: 'portfolio'
        }
      ],
      notes: 'Writes in Go, Javascript and Shell. 132 stars.'
    };

    var greenhouse = new Greenhouse(conf.options);
    greenhouse.createCandidate(candidate, function (err, response) {
      assert(!err);
      greenhouse.getCandidate(response.id, function (err, response) {
        assert(response.length === 1);
        var cand = response[0];
        assert(candidate.first_name === cand.first_name + ' ' + cand.last_name);
        done();
      });
    });
  });

});