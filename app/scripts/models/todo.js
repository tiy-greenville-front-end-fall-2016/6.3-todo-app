var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  idAttribute: '_id'
});

var TodoCollection = Backbone.Collection.extend({
  model: Todo,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/todos'
});


module.exports = {
  Todo: Todo,
  TodoCollection: TodoCollection
};
