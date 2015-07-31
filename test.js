$(function () {
	// 他们的代码里view怎么有个属性是model？原生得view是不支持直接绑定model
	var AppView = Backbone.View.extend({
	  	el: $('.app'),

		initialize: function () {
		  console.log(this.$el[0]);
		},

	  	events: {
			'click .submit': 'submit'
		},

		submit: function (e) {
			alert(cache.input);
		},

		render: function () {
		}
	});

	var t = new AppView;

	console.log(t);
});
