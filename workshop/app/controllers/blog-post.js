import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addComment: function() {
      var controller = this;
      this.store.createRecord('comment', {
        blogPost: this.get('content'),
        content: this.get('commentContent')
      }).save().then(function() {
        controller.set('commentContent', '');
      });
    }
  }
});
