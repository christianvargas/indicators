App.module('IndicatorsApp.Edit', function(Edit, App, Backbone, Marionette, $, _){
	Edit.Controller = {
		editIndicator: function(id){
			var loadingView = new App.Common.Views.Loading();
			App.regions.main.show(loadingView);

			var fetchingIndicator = App.request('indicator:entity', id);
			$.when(fetchingIndicator).done(function(indicator){
				var view;
				if( indicator !== undefined ){
					view = new Edit.Indicator({
						model: indicator,
						generateTitle: true
					});

					view.on('form:submit', function(data){
						if( indicator.save(data) ){
							App.trigger('indicator:show', indicator.get('id'));
						} else {
							view.triggerMethod('form:data:invalid', indicator.validationError);
						}
					});
				} else {
					view = new App.IndicatorsApp.Show.MissingIndicator();
				}

				App.regions.main.show(view);
			});
		}
	}
});