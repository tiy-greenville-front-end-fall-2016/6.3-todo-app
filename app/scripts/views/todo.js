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
    'click .clickme': 'complete',
    'click .hideme': 'hide'
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
  hide: function(){
    this.model.set('visible', false);
  },
  toggleVisible: function(){
    this.$el.hide();
  },
  complete: function(){
    // Hook the confirm modal view's model to this todo model
    confirmModal.model = this.model;

    // Show the modal
    confirmModal.show();
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


var TodoConfirmModal = Backbone.View.extend({
  el: $('#confirm-delete')[0],
  events: {
    "click .btn-primary": 'delete',
  },
  hide: function(){
    this.$el.modal('hide');
  },
  show: function(){
    this.$el.modal('show');
  },
  delete: function(){
    // User confirmed the deletion, so go delete the model!
    this.model.destroy();

    // Hide the modal
    this.hide();
  }
});

// Confirm Modal Singleton
var confirmModal = new TodoConfirmModal();


module.exports = {
  TodoInstructionsView: TodoInstructionsView,
  TodoListView: TodoListView,
  TodoItemView: TodoItemView,
  TodoFormView: TodoFormView
};
