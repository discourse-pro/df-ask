import Composer from 'discourse/models/composer';
// 2018-03-22
// 1) «Important changes to Plugin Outlets for Ember 2.10»: https://meta.discourse.org/t/54136
// 2) «How to add a button to user profiles?»: https://discourse.pro/t/288
export default {
	actions: {
		onClick() {
			// 2018-03-23
			// I implemented the controller retrieving by analogy with
			// https://github.com/vinkashq/discourse-content_lockers/blob/8996e438/assets/javascripts/discourse/lib/show-lockable-modal.js.es6#L3-L8
			const container = Discourse.__container__;
			const route = container.lookup('route:application');
    		const composerController = route.controllerFor('composer');
    		if (!Discourse.User.current()) {
				route.send('showLogin');
			}
			else {
				// 2018-03-21
				// I implemented it by analogy with
				// https://github.com/discourse/discourse-staff-notes/blob/e59507e3/assets/javascripts/discourse-staff-notes/connectors/user-profile-controls/show-notes-on-profile.js.es6#L21-L21
				const user = this.get('args.model');
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
						,recipient: user.username
					}}
				});
			}
		}
	}
	,shouldRender(args, component) {
		//return component.siteSettings.my_plugin_enabled;
		return true;
	}
}