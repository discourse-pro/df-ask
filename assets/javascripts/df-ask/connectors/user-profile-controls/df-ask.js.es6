// 2018-03-22
// 1) «Important changes to Plugin Outlets for Ember 2.10»: https://meta.discourse.org/t/54136
// 2) «How to add a button to user profiles?»: https://discourse.pro/t/288
export default {
	actions: {
		showForm() {console.log('showForm');}
	}
	,shouldRender(args, component) {
		//return component.siteSettings.my_plugin_enabled;
		return true;
	}
}