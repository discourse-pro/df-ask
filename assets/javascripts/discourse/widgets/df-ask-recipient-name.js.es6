import {userPath} from 'discourse/lib/url';
import {createWidget} from 'discourse/widgets/widget';
import {h} from 'virtual-dom';
export default createWidget('df-ask-recipient-name', {
	tagName: null
	,html(topic, state) {
		const r = [];
		const rec = topic.df_ask__recipient;
		if (rec) {
			r.push(this.attach('poster-name', {
				name: rec.name
				,username: rec.username
				,usernameUrl: userPath(rec.username)
			}));
		}
		return r;
	}
});