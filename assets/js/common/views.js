App.module('Common.Views', function(Views, App, Backbone, Marionette, $, _){
	Views.Loading = Marionette.ItemView.extend({
		template: '#loading-view',

		title: '',
		message: '',

		serializeData: function(){
			return {
				title: Marionette.getOption(this, 'title'),
				message: Marionette.getOption(this, 'message')
			}
		}
	});
})