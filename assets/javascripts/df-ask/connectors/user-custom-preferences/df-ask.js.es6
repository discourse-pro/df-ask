import {default as DiscourseURL, userPath} from 'discourse/lib/url';
export default {
	/**
	 * 2018-04-06
	 * @used-by https://github.com/discourse/discourse/blob/v2.0.0.beta5/app/assets/javascripts/discourse/components/plugin-connector.js.es6#L5-L16
	 *		const connectorClass = this.get('connector.connectorClass');
	 *		connectorClass.setupComponent.call(this, args, this);
	 */
	setupComponent(args) {this.set('url', location.origin + userPath(args.model.username) + '/ask');}
}