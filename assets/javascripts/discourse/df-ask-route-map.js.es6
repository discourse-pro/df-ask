export default {
	map() {
		this.route('ask');
	},
	path: 'users/:username',
	resource: 'user'
};