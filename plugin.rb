# name: df-ask
# about: «Ask me a question» plugin
# version: 1.4.1
# authors: Dmitry Fedyuk
# url: https://github.com/discourse-pro/df-ask
register_asset 'stylesheets/main.scss'
Discourse::Application.routes.append do
	get 'users/:username/ask' => 'users#show', constraints: {username: USERNAME_ROUTE_FORMAT}
	get 'u/:username/ask' => 'users#show', constraints: {username: USERNAME_ROUTE_FORMAT}
end
# 2018-04-03 I implemented it by analogy with the `discourse-signatures` plugin:
# https://github.com/discourse/discourse-signatures/blob/3b61cf4a/plugin.rb#L11
DiscoursePluginRegistry.serialized_current_user_fields << 'df_ask_description_raw'
after_initialize do
	# 2018-04-03 I implemented it by analogy with the `discourse-signatures` plugin:
	# https://github.com/discourse/discourse-signatures/blob/3b61cf4a/plugin.rb#L17
	User.register_custom_field_type('df_ask_description_raw', :text)
	# 2018-04-03 I implemented it by analogy with the `discourse-signatures` plugin:
	# https://github.com/discourse/discourse-signatures/blob/3b61cf4a/plugin.rb#L28-L35
	add_to_serializer(:user, :custom_fields, false) {
		if object.custom_fields == nil then
			{}
		else
			object.custom_fields
		end
	}
	# 2018-04-03 I implemented it by analogy with the `discourse-signatures` plugin:
	# https://github.com/xfalcox/discourse-signatures/blob/master/plugin.rb#L38-L45
	DiscourseEvent.on(:user_updated) do |user|
		if user.custom_fields['df_ask_description_raw']
			cooked = PrettyText.cook(
				user.custom_fields['df_ask_description_raw'],
				omit_nofollow: user.has_trust_level?(TrustLevel[3]) && !SiteSetting.tl3_links_no_follow
			)
			# avoid infinite recursion
			if cooked != user.custom_fields['df_ask_description_cooked']
				user.custom_fields['df_ask_description_cooked'] = cooked
				user.save
			end
		end
	end
	# 2018-03-29
	add_to_class(:topic, :df_ask__recipient) do
		@df_ask__recipient ||
			if user_id = custom_fields['df_ask__recipient']
			@df_ask__recipient = User.find_by(id: user_id)
		end
	end
	# 2018-03-29 I implemented it by analogy with the `discourse-assign` plugin:
	# https://github.com/discourse/discourse-assign/blob/e7d38c90/plugin.rb#L139-L141
	add_to_class(:topic, :df_ask__preload_recipient) do |v|
		@df_ask__recipient = v
	end
	# 2018-03-29 I implemented it by analogy with the `discourse-assign` plugin:
	# https://github.com/discourse/discourse-assign/blob/e7d38c90/plugin.rb#L151-L155
	add_to_class(:topic_view_serializer, :df_ask__recipient_id) do
		id = object.topic.custom_fields['df_ask__recipient']
		# a bit messy but race conditions can give us an array here, avoid
		id && id.to_i rescue nil
	end
	# 2018-03-29 I implemented it by analogy with the `discourse-assign` plugin:
	# https://github.com/discourse/discourse-assign/blob/e7d38c90/plugin.rb#L147-L149
	add_to_serializer(:topic_view, :df_ask__recipient, false) do
		if df_ask__recipient_id && user = User.find_by(id: df_ask__recipient_id)
			{
				avatar_template: user.avatar_template,
				id: user.id,
				name: user.name,
				username: user.username,
			}
		end
	end
	# 2018-03-29 I implemented it by analogy with the `discourse-assign` plugin:
	# https://github.com/discourse/discourse-assign/blob/e7d38c90/plugin.rb#L157-L162
	add_to_serializer(:topic_view, 'include_df_ask__recipient?') do
		object.topic.custom_fields.keys.include?('df_ask__recipient')
	end
end