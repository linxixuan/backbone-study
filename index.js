$(function () {
  	var cache = {};

  	var ItemModel = Backbone.Model.extend({
		defaults: {
			"text": ""
		}
	});

	// 这些DOM一开始不会出现
	// 照以前的写法注册的事件不会触发
	var ItemView = Backbone.View.extend({
	  	el: $('.js-li'),

		events: {
			'click .js-li': 'say'
		},

		say: function () {
			alert(123);
		},

	  	initialize: function (options) {
			this.text = options.text;
		},

		template: function () {
			return '<span><%= text %></span>';
		},

		render: function () {
			var templating = _.template(this.template()),
				content = templating({text: this.text});
			this.$el.html(content);
			return;
		}
	});

	var ItemList = Backbone.Collection.extend({
		model: ItemModel,
	});

	var items = new ItemList();

	// 他们的代码里view怎么有个属性是model？原生得view是不支持直接绑定model
	var AppView = Backbone.View.extend({
	  	el: $('.app'),

		initialize: function () {
			this.listenTo(this.collection, 'add', this.render);
		},

	  	events: {
			'blur .label': 'input',
			'click .submit': 'submit'
		},

		input: function (e) {
			cache.input = e.target.value;
		},

		submit: function (e) {
			this.collection.add({"text": cache.input});
			$('.label').val('');
		},

		render: function () {
		  	var self = this,
				t,
				index = 0;
			self.$el.find('ul').html('');
			this.collection.each(function (a) {
				self.$el.find('ul').append('<li class="js-li ' + index + '"></li>');
			  	t = new ItemView({text: a.get('text'), el: $('.' + index)});
				console.log(t.$el);
				t.render();
				index++;
			});

			return this;
		}
	});

	var t = new AppView({collection: items});
});
