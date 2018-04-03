import Composer from 'discourse/models/composer';
export default Discourse.Route.extend({
	actions: {
		showComposer(user) {
			// 2018-03-23
			// I implemented the controller retrieving by analogy with
			// https://github.com/vinkashq/discourse-content_lockers/blob/8996e438/assets/javascripts/discourse/lib/show-lockable-modal.js.es6#L3-L8
			const container = Discourse.__container__;
			const route = container.lookup('route:application');
			const composerController = route.controllerFor('composer');
			// 2018-03-28
			// «How to programmatucally check in JavaScript
			// whether the current Discourse user is authenticated?» https://discourse.pro/t/76
			if (!Discourse.User.current()) {
				route.send('showLogin');
			}
			else {
				// 2018-03-23
				// I implemented it by analogy with
				// https://github.com/discourse/discourse/blob/v2.0.0.beta4/app/assets/javascripts/discourse/routes/application.js.es6#L56-L69
				return composerController.open({
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
				});
			}
		}
	}
});