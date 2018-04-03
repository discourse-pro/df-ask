import Composer from 'discourse/models/composer';
export default Discourse.Route.extend({
	/**
	 * 2018-04-03
	 * @override
	 * https://stackoverflow.com/a/39863795
	 */
	activate() {
		this._super(...arguments);
		let root = Ember.getOwner(this).get('rootElement');
		Ember.$(root).addClass('df-ask-screen');
	},
	/**
	 * 2018-03-23
	 * I implemented the controller retrieving by analogy with
	 * https://github.com/vinkashq/discourse-content_lockers/blob/8996e438/assets/javascripts/discourse/lib/show-lockable-modal.js.es6#L3-L8
	 */
	composer() {return this.route().controllerFor('composer');},
	/**
	 * 2018-03-23
	 * I implemented the controller retrieving by analogy with
	 * https://github.com/vinkashq/discourse-content_lockers/blob/8996e438/assets/javascripts/discourse/lib/show-lockable-modal.js.es6#L3-L8
	 */
	route() {return Discourse.__container__.lookup('route:application');},
	actions: {
		// 2018-03-28
		// «How to programmatucally check in JavaScript
		// whether the current Discourse user is authenticated?» https://discourse.pro/t/76
		// 2018-03-23
		// I implemented it by analogy with
		// https://github.com/discourse/discourse/blob/v2.0.0.beta4/app/assets/javascripts/discourse/routes/application.js.es6#L56-L69
		showComposer(user) {return this.composer().open({
			action: Composer.CREATE_TOPIC
			,draftKey: Composer.CREATE_TOPIC
			,draftSequence: 0
			,reply: null
			// 2018-03-23
			// https://github.com/discourse/discourse/blob/90af1659/app/assets/javascripts/discourse/models/composer.js.es6#L507-L507
			,metaData: {df: {
				actionTitle: I18n.t('df_ask.composer_action_title')
				,recipient: {id: user.id, name: user.username}
			}}
		});},
		/**
		 * 2018-04-04
		 * @override
		 * https://guides.emberjs.com/v2.13.0/routing/preventing-and-retrying-transitions/#toc_preventing-transitions-via-code-willtransition-code
		 */
		willTransition() {
			this.composer().cancelComposer();
			return true;
		}
	}
});