App.module('IndicatorsApp.Show', function(Show, App, Backbone, Marionette, $, _){
	Show.Controller = {
		showIndicator: function( id ){
			var loadingView = new App.Common.Views.Loading({
				message: 'Or is it?'
			});
			App.regions.main.show(loadingView);

			var fetchingIndicator = App.request('indicator:entity', id);
			$.when(fetchingIndicator).done(function(indicator){
				var indicatorView;
				if( indicator !== undefined ){
					indicatorView = new Show.Indicator({
						model: indicator
					});

					indicatorView.on('indicator:edit', function(indicator){
						App.trigger('indicator:edit', indicator.get('id'));
					});
				} else {
					indicatorView = new Show.MissingIndicator();
				}

				App.regions.main.show(indicatorView);
			});
		}
	}
});