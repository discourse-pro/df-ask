export default Ember.Component.extend({
	classNames: ['df-ask--recipient']
	,tagName: 'div'
	,didInsertElement() {
		this._super();
		const rec = this.topic.df_ask__recipient;
		if (rec) {
			this.set('df_ask__recipient', rec.username);
		}
	}
});