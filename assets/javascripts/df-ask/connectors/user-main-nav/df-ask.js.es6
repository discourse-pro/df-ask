export default {
	/**
	 * 2018-04-02
	 * @override
 	 * @param args
	 * @param component
	 * @returns {boolean}
	 */
	shouldRender(args, component) {
		const c = Discourse.User.current();
		return !c || c.id !== args.model.id;
	}
}