window.$ = window.jQuery = require('jquery');
require('bootstrap-sass/assets/javascripts/bootstrap');
var Backbone = require('backbone');
var todoItemTemplate = require('../../templates/todoitem.hbs');

var TodoInstructionsView = Backbone.View.extend({
  tagName: 'p',
  attributes: {
    id: 'instructions',
    'class': 'todo-instructions well col-md-12'
  },
  render: function(){
    // console.log(this.el);
    // console.log(this.$el);
    this.$el.text('Please add your todos');

    return this;
  }
});


var TodoListView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    'class': 'todo-items col-md-12 list-group'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderTodoItem);
  },
  render: function(){
    return this;
  },
  renderTodoItem: function(todo){
    var todoItem = new TodoItemView({model: todo});
    this.$el.append(todoItem.render().el);
  }
});


var TodoItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: todoItemTemplate,
  events: {
    'click .clickme': 'complete'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
    this.listenTo(this.model, 'change:visible', this.toggleVisible);
  },
  render: function(){
    var context = this.model.toJSON();
    var renderedTemplate = this.template(context);

    this.$el.html(renderedTemplate);

    return this;
  },
  remove: function(){
    this.$el.remove();
  },
  toggleVisible: function(){

  },
  complete: function(){
    console.log('complete');
  }
});

var TodoFormView = Backbone.View.extend({
  events: {
    'submit': 'addTodo'
  },
  addTodo: function(event){
    event.preventDefault();

    var todoTitle = $('#title').val();
    this.collection.create({title: todoTitle});

    $('#title').val('');
  }
});



module.exports = {
  TodoInstructionsView: TodoInstructionsView,
  TodoListView: TodoListView,
  TodoItemView: TodoItemView,
  TodoFormView: TodoFormView
};
