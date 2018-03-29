# name: df-ask
# about: «Ask me a question» plugin
# version: 1.1.3
# authors: Dmitry Fedyuk
# url: https://github.com/discourse-pro/df-ask
register_asset 'stylesheets/main.scss'
after_initialize do
	add_permitted_post_create_param('custom_fields')
	Post.register_custom_field_type('df_ask__recipient', :text)
	PostRevisor.track_topic_field(:custom_fields)
end