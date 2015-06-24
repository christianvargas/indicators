App.module('IndicatorsApp.Show', function(Show, App, Backbone, Marionette, $, _){
	Show.MissingIndicator = Marionette.ItemView.extend({
		template: '#missing-indicator-view'
	});

	Show.Indicator = Marionette.ItemView.extend({
		template: '#indicator-view',

		events: {
			'click a.js-edit': 'editClicked'
		},

		editClicked: function(e){
			e.preventDefault();
			this.trigger('indicator:edit', this.model);
		}
	});
});