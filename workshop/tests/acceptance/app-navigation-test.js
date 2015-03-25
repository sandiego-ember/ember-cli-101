import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'workshop/tests/helpers/start-app';

var application;

module('Acceptance: AppNavigation', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('clicking blog posts link visits /blog-posts', function(assert) {
  visit('/');
  click('a:contains("Blog Posts")');

  andThen(function() {
    assert.equal(currentPath(), 'blog-posts.index');
  });
});
