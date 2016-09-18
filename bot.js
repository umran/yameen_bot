//Load twitter module
var Twitter = require('twitter')
var matcher = require('./matcher')
//Load de JSON file with bot's keys and tokens
var keys = require('./keysBot.json')

//Create the bot
var client = new Twitter(keys)

//The word that we are going to search in tweets
var words = "yameen, yaameen, yamin, yaamin"

//Variables to store the twitter user id and screen name to make a reply
var id_str, screen_name


client.stream('statuses/filter', {track: words}, function(stream) {
	console.log('Bot started looking for yaameen tweets')
	stream.on('data', function(tweet) {

		var text = tweet.text
		if(matcher(text)) {

			console.log(tweet.text)
			id_str = tweet.id_str
			screen_name = tweet.user.screen_name
			name = tweet.user.name
			
			client.post('statuses/update', {
				in_reply_to_status_id: id_str, 
				status: '@' + screen_name + ' and Yameen stands with you, ' + name + ', my obedient slave.'
			},
			function(error, tweet, response){
				if(error) {
					console.log(error)
				}
			})
		}
	})

	stream.on('error', function(error) {
		throw error
	})
})