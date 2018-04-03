export default Ember.Component.extend({
   /**
	* 2018-04-03
	* @override
	* https://guides.emberjs.com/v2.13.0/components/the-component-lifecycle/#toc_on-initial-render
	*/
	didRender() {
		this._super();
		debugger;
		this.sendAction('show', this._targetObject.model);
	},
	tagName: ''
});