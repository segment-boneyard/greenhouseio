
var assert = require('assert');
var Greenhouse = require('..');
var conf = require('./conf');

describe('greenhouse', function () {
  this.timeout(5000);

  it('should create a prospect', function (done) {
    var candidate = {
      first_name: 'Johnny',
      last_name: 'Appleseed',
      emails: [
        {
          email: 'johnny@apples.co',
          type: 'personal'
        }
      ],
      websites: [
        {
          url: 'https://github.com/appleseed',
          type: 'portfolio'
        }
      ],
      notes: 'Writes in Go, Javascript and Shell. 132 stars.',
      job_id: 47577,
      external_id: 'appleseed'
    };

    var greenhouse = new Greenhouse(conf.options);
    greenhouse.createCandidate(candidate, function (err, response) {
      assert(!err);
      greenhouse.getCandidate(response.body.id, function (err, response) {
        assert(response.body.length === 1);
        var cand = response.body[0];
        assert(cand.name === candidate.first_name + ' ' + candidate.last_name);
        done();
      });
    });
  });

});