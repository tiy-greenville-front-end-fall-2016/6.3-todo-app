var $ = require('jquery');
var views = require('./views/todo');
var models = require('./models/todo');

// DOM Ready
$(function(){
  var todoCollection = new models.TodoCollection();

  var todoForm = new views.TodoFormView({collection: todoCollection});
  todoForm.setElement($('#todo-form')[0]);

  var directions = new views.TodoInstructionsView();
  $('.app').append(directions.render().el);

  var todoList = new views.TodoListView({collection: todoCollection});
  $('.app').append(todoList.render().el);




  todoCollection.fetch();
  // todoCollection.add([
  //   {'title': 'Learn some backbone views'},
  //   {'title': 'Feed the dog'}
  // ]);
});
