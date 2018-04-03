export default Ember.Component.extend({
   /**
	* 2018-04-03
	* @override
	* https://guides.emberjs.com/v2.13.0/components/the-component-lifecycle/#toc_on-initial-render
	*/
	didRender: function() {
		this._super();
		if (Discourse.User.current()) {
			this.sendAction('show', this._targetObject.model);
		}
		else {
			/**
			 * 2018-03-04
			 * 1) "The registration popup should be shown to unregistered visitors on the «Ask me» page'
			 * https://github.com/discourse-pro/df-ask/issues/11
			 * 2) https://stackoverflow.com/a/21189476
			 */
			Ember.run.scheduleOnce('afterRender', this, function() {
				const r = Discourse.__container__.lookup('route:application');
				r.send('showLogin');
			});
		}
	}.observes('content'),
	tagName: ''
});