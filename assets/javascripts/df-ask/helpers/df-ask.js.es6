import {registerUnbound} from 'discourse-common/lib/helpers';
export default registerUnbound('df-ask-viewing-self', function(user) {
	const c = Discourse.User.current();
	return c && c.username.toLowerCase() === user.username.toLowerCase();
});