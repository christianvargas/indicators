App.module('IndicatorsApp.Edit', function(Edit, App, Backbone, Marionette, $, _){
	Edit.Indicator = App.IndicatorsApp.Common.Views.Form.extend({
		initialize: function(){
			this.title = 'Edit Indicator';
		},

		onRender: function(){
			if( this.options.generateTitle ){
				var $title = $('<h3>', { text: this.title });
				this.$el.prepend( $title );
			}

			this.$('.js-submit').text('Update Indicator');
		}
	});
});