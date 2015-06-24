App.module('IndicatorsApp', function(IndicatorsApp, App, Backbone, Marionette, $, _){
	IndicatorsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'indicators': 'listIndicators',
			'indicators/:id': 'showIndicator',
			'indicators/:id/edit': 'editIndicator'
		}
	});

	var API = {
		listIndicators: function(){
			IndicatorsApp.List.Controller.listIndicators();
		},

		showIndicator: function(id){
			IndicatorsApp.Show.Controller.showIndicator(id);
		},

		editIndicator: function(id){
			IndicatorsApp.Edit.Controller.editIndicator(id);
		}
	};

	App.on('indicators:list', function(){
		App.navigate('indicators');
		API.listIndicators();
	});

	App.on('indicator:show', function(id){
		App.navigate('indicators/' + id);
		API.showIndicator(id);
	});

	App.on('indicator:edit', function(id){
		App.navigate('indicators/' + id + '/edit');
		API.editIndicator(id);
	});

	IndicatorsApp.on('start', function(){
		new IndicatorsApp.Router({
			controller: API
		})
	});
});