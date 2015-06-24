App.module('IndicatorsApp.New', function(New, App, Backbone, Marionette, $, _){
	New.Indicator = App.IndicatorsApp.Common.Views.Form.extend({
		title: 'New Indicator',

		onRender: function(){
			this.$('.js-submit').text('Create indicator');
		}
	});
});