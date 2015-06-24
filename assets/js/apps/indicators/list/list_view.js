App.module('IndicatorsApp.List', function(List, App, Backbone, Marionette, $, _){
	List.Layout = Marionette.LayoutView.extend({
		template: '#indicator-list-layout',

		regions: {
			panelRegion: '#panel-region',
			indicatorsRegion: '#indicators-region'
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: '#indicator-list-panel',

		triggers: {
			'click button.js-new': 'indicator:new'
		}
	});

	List.Indicator = Marionette.ItemView.extend({
		template: '#indicator-list-item',

		triggers: {
			'click a.js-show': 'indicator:show',
			'click a.js-edit': 'indicator:edit',
			'click button.js-delete': 'indicator:delete',
		},

		events: {
			'click': 'highlightName',
		},

		highlightName: function(e){
			this.$el.toggleClass('warning');
			this.trigger('indicator:highlight', this.model);
		},

		remove: function(){
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		}

	});

	List.Indicators = Marionette.CompositeView.extend({
		template: '#indicator-list',
		childView: List.Indicator,
		childViewContainer: '#indicatorsList',

		initialize: function(){
			this.listenTo(this.collection, 'reset', function(){
				collectionView.$el.append( childView.el );
			})
		},

		onRenderCollection: function(){
			this.attachHtml = function(collectionView, childView, index){
				collectionView.$el.append( childView.el );
			}
		}
	});
});