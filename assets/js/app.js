var App = new Marionette.Application();

App.navigate = function(route, options){
	options || (options = {});
	Backbone.history.navigate(route, options);
};

App.getCurrentRoute = function(){
	return Backbone.history.fragment;
};

App.on('before:start', function(){
	var RegionContainer = Marionette.LayoutView.extend({
		el: '#app-container',

		regions: {
			main: '#main-region',
			dialog: '#dialog-region'
		}
	});

	App.regions = new RegionContainer();
	App.regions.dialog.onShow = function(view){
		var self = this;
		var closeDialog = function(){
			self.stopListening();
			self.empty();
			self.$el.dialog('destroy');
		};

		this.listenTo(view, 'dialog:close', closeDialog);

		this.$el.dialog({
			modal: true,
			title: view.title,
			width: 'auto',
			close: function(e, ui){
				closeDialog();
			}
		});
	};
});

App.on('start', function(){
	if( Backbone.history ){
		Backbone.history.start();

		if( this.getCurrentRoute() === '' ){
			App.trigger('indicators:list');
		}
	}
});
