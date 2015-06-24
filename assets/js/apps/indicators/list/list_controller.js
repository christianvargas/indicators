App.module('IndicatorsApp.List', function(List, App, Backbone, Marionette, $, _){
	List.Controller = {
		listIndicators: function(){

			var loadingView = new App.Common.Views.Loading();
			App.regions.main.show(loadingView);

			var fetchingIndicators = App.request('indicator:entities');

			var indicatorsListLayout = new List.Layout();
			var indicatorsListPanel = new List.Panel();

			$.when(fetchingIndicators).done(function(indicators){
				var indicatorsListView = new List.Indicators({
					collection: indicators
				});

				indicatorsListLayout.on('show', function(){
					indicatorsListLayout.panelRegion.show(indicatorsListPanel);
					indicatorsListLayout.indicatorsRegion.show(indicatorsListView);
				});

				indicatorsListPanel.on('indicator:new', function(){
					var newIndicator = new App.Entities.Indicator();

					var view = new App.IndicatorsApp.New.Indicator({
						model: newIndicator
					});

					view.on('form:submit', function(data){
						if( indicators.length > 0 ){
							var highestId = indicators.max(function(c){ return c.id; }).get('id');
							data.id = highestId + 1;
						} else {
							data.id = 1;
						}

						if( newIndicator.save(data) ){
							indicators.add(newIndicator);
							view.trigger('dialog:close');
						} else {
							view.triggerMethod('form:data:invalid', newIndicator.validationError);
						}
					});

					App.regions.dialog.show(view);
				});

				indicatorsListView.on('childview:indicator:show', function(childView, args){
					App.trigger('indicator:show', args.model.get('id'));
				});

				indicatorsListView.on('childview:indicator:edit', function(childView, args){
					var model = args.model;
					var view = new App.IndicatorsApp.Edit.Indicator({
						model: model
					});

					view.on('form:submit', function(data){
						if( model.save(data) ){
							childView.render();
							view.trigger('dialog:close');
						} else {
							view.triggerMethod('form:data:invalid', model.validationError);
						}
					});

					App.regions.dialog.show(view);
				});

				indicatorsListView.on('childview:indicator:delete', function(childView, args){
					args.model.destroy();
				});				

				App.regions.main.show(indicatorsListLayout);
			});
		}
	}
});