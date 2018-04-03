export default Ember.Component.extend({
	classNames: ['df-ask--recipient'],
	tagName: '',
   /**
	* 2018-04-03
	* @override
	* https://guides.emberjs.com/v2.13.0/components/the-component-lifecycle/#toc_on-initial-render
	*/
	didInsertElement() {
		this._super();
		this.set('description', this._targetObject.model.get('custom_fields.df_ask_description_cooked'));
	}
});