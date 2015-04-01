import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  publishedDate: DS.attr('date'),
  comments: DS.hasMany('comment')
});
