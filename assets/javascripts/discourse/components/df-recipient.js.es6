export default Ember.Component.extend({
	tagName: ''
	,didInsertElement() {
		this._super();
		const rec = this.topic.df_ask__recipient;
		if (rec) {
			this.set('df_ask__recipient', rec.username);
		}
	}
});