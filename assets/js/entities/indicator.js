App.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
	Entities.Indicator = Backbone.Model.extend({
		urlRoot: 'indicators',

		defaults: {
			categoryCode: '',
			categoryName: '',
			name: '',
			question: '',
			code: '',
			unit: '',
			help: '',
			rationale: '',
			notes: '',
			businessValue: '',
			theme: '',
		},

		validate: function(attrs, options){
			var errors = {}
			if( ! attrs.name ){
				errors.name = 'Required';
			}
			if( ! attrs.question ){
				errors.question = 'Required';
			}

			if( ! _.isEmpty(errors) ){
				return errors;
			}
		}
	});

	Entities.configureStorage('App.Entities.Indicator');

	Entities.IndicatorCollection = Backbone.Collection.extend({
		url: 'indicators',
		model: Entities.Indicator,
		comparator: 'firstName'
	});

	Entities.configureStorage('App.Entities.IndicatorCollection');

	var initializeIndicators = function(){
		var indicators = new Entities.IndicatorCollection([
			{"id":844,"categoryCode":"E","categoryName":"Environmental","name":"Environmental Policy","question":"Has the company formally committed to reducing the environmental impact of its operations?","code":"E.1","unit":"","help":"Formal commitments include devising and implementing programs, policies, and procedures.","rationale":"Determines whether the company has a policy and procedures in place to reduce environmental impact. Addressing environmental impact indicates that steps have been taken to improve ESG performance at the company. However the key aspect of this question is assessing whether the efforts being made are quantitative and target-driven, which is considered best practice and allow firms to measure and track reductions over time. Additionally, reducing the environmental footprint typically results in cost savings.","notes":"","businessValue":"Operational Efficiency","theme":"Environmental Impacts"},
			{"id":865,"categoryCode":"E","categoryName":"Environmental","name":"Public Disclosure of CO2e Emissions","question":"Does the company publicly disclose its annual CO2e emissions?","code":"E.19","unit":"","help":"Third-party projects include the Carbon Disclosure Project (CDP) and industry organizations.","rationale":"Reporting contributes to the trustworthiness and credibility of the company and may allow the company to retain or attract new customers. With  increasing demands for corporate transparency, disclosure--especially regarding CO2e emissions--reflects a company's management of climate risk.","notes":"","businessValue":"Brand Value & Reputation","theme":"Transparency & Disclosure"},
			{"id":964,"categoryCode":"S","categoryName":"Social","name":"Energy Reduction Incentives","question":"Does the company incentivize consumers taking action to reduce their energy demand?","code":"S.27","unit":"","help":"Incentives may include equipment rebates, subsidies, free energy audits, etc.","rationale":"Determines if company has made an effort to reduce consumer energy use. Utilities are in a unique position to encourage energy efficiency which addresses climate change by reducing amount of fossil fuel combusted with is a large emitter of greenhouse gas emissions.","notes":"","businessValue":"Innovation","theme":"Energy"},
			{"id":920,"categoryCode":"G","categoryName":"Governance","name":"Aligning Compensation with ESG","question":"Are executive's compensation tied to the environmental, social, and governance (ESG) performance of the company?","code":"G.21","unit":"","help":"","rationale":"Determines the extent to which ESG performance is integrated  into the business strategy of the company. Connecting ESG performance into compensation considerations supports ESG policies and procedures in place and creates strong incentives for improvement. Tying ESG performance to executive's compensation is emerging as best practice. UN-Supported Principles for Responsible Investment (PRI) recognizes the value through publishing framework to guide to guide investors and companies to implement policy and procedures to align compensation with ESG performance.","notes":"","businessValue":"Shareholder value","theme":"Transparency & Disclosure"}
		]);
		indicators.forEach(function(indicator){
			indicator.save();
		});
		return indicators.models;
	};

	var API = {
		getIndicatorEntities: function(){
			var indicators = new Entities.IndicatorCollection();
			var defer = $.Deferred();
			indicators.fetch({
				success: function(data){
					defer.resolve(data);
				}
			});

			var promise = defer.promise();
			$.when(promise).done(function(fetchedIndicators){
				if( fetchedIndicators.length === 0 ){
					var models = initializeIndicators();
					indicators.reset(models);
				}
			});
			return promise;
		},

		getIndicatorEntity: function(indicatorId){
			var indicator = new Entities.Indicator({id: indicatorId});
			var defer = $.Deferred();

			indicator.fetch({
				success: function(data){
					defer.resolve(data);
				},
				error: function(data){
					defer.resolve(undefined);
				}
			});

			return defer.promise();
		}
	};

	App.reqres.setHandler('indicator:entities', function(){
		return API.getIndicatorEntities();
	});

	App.reqres.setHandler('indicator:entity', function(id){
		return API.getIndicatorEntity(id);
	});

});