var re = new RegExp(/I(\s*\S*\s*){0,3}(stand|stood|am|be)\s*(with|by)(\s*\S*\s*){0,3}(yameen|yaameen|yamin|yaamin)/ig)

module.exports = function(phrase) {
	var result = re.exec(phrase)
	
	if(result == null) {
		return false
	}
	
	var meta_data = {}
	
	meta_data.exact_phrase = result[0],
	
	meta_data.preferences = {
		verb: result[1],
		preposition: result[3],
		name: result[5]
	}
	
	meta_data.modifiers = {
		prefixes: result[1], 
		titles: result[4]
	}
	
	return meta_data
}