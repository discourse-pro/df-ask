# name: df-ask
# about: «Ask me a question» plugin
# version: 1.3.0
# authors: Dmitry Fedyuk
# url: https://github.com/discourse-pro/df-ask
register_asset 'stylesheets/main.scss'
Discourse::Application.routes.append do
	get 'users/:username/ask' => 'users#show', constraints: {username: USERNAME_ROUTE_FORMAT}
	get 'u/:username/ask' => 'users#show', constraints: {username: USERNAME_ROUTE_FORMAT}
end
after_initialize do
	add_to_class(:topic, :df_ask__recipient) do
		@df_ask__recipient ||
			if user_id = custom_fields['df_ask__recipient']
			@df_ask__recipient = User.find_by(id: user_id)
		end
	end
	add_to_class(:topic, :df_ask__preload_recipient) do |v|
		@df_ask__recipient = v
	end
	add_to_class(:topic_view_serializer, :df_ask__recipient_id) do
		id = object.topic.custom_fields['df_ask__recipient']
		# a bit messy but race conditions can give us an array here, avoid
		id && id.to_i rescue nil
	end
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
	add_to_serializer(:topic_view, 'include_df_ask__recipient?') do
		object.topic.custom_fields.keys.include?('df_ask__recipient')
	end
end