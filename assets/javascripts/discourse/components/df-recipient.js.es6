export default Ember.Component.extend({
	classNames: ['df-ask--recipient']
	,tagName: 'div'
	,didInsertElement() {
		this._super();
		const rec = this.topic.df_ask__recipient;
		if (rec) {
			this.set('avatar', rec.username);
			this.set('username', rec.username);
		}
	}
});