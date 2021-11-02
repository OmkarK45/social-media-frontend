/**
 * @param caption - caption of the post
 * @returns array containing usernames
 */
export function getMentions(caption: string) {
	const regex = /\B@\w\w+\b/g
	const result = caption.match(regex)
	if (result) {
		const arr = result.filter((item, index, array) => {
			return array.indexOf(item) === index
		})
		const finalArr = arr.map((item) => {
			return item.replace('@', '')
		})
		return finalArr
	} else {
		return []
	}
}
