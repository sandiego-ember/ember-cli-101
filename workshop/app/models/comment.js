import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  blogPost: DS.belongsTo('blogPost')
});
