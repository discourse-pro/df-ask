import {userPath} from 'discourse/lib/url';
import {createWidget} from 'discourse/widgets/widget';
import {h} from 'virtual-dom';
export default createWidget('df-ask-recipient-avatar', {
	html(topic, state) {
		const r = [];
		const rec = topic.df_ask__recipient;
		if (rec) {
			r.push(this.attach('post-avatar', {
				name: rec.name
				,avatar_template: rec.avatar_template
				,username: rec.username
				,user_id: rec.id
				,usernameUrl: userPath(rec.username)
			}));
		}
		return r;
	}
});