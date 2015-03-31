import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'workshop/tests/helpers/start-app';

var application;

module('Acceptance: BlogPostShow', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visit blog post from index', function(assert) {
  visit('/');
  var blogSelector = 'article:first-of-type a';

  andThen(function() {
    click(blogSelector);
  });

  andThen(function() {
    assert.equal(currentURL(), '/post/1');
  });
});
