export interface HashTag {
	where: {
		hashtag: string
	}
	create: {
		hashtag: string
	}
}
/**
 *
 * @param caption - caption of the post
 * @returns prisma partial query to be put into query
 */
export function parseHashtags(caption: string): Array<HashTag> {
	const hashtags = caption.match(/#[\w]+/g) || []
	return hashtags.map((hashtag) => ({
		where: { hashtag },
		create: { hashtag },
	}))
}
