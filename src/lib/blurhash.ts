import { getPlaiceholder } from 'plaiceholder'

export async function getHash(imageURL: string) {
	const { blurhash } = await getPlaiceholder(imageURL, {
		size: 42,
	})
	// if sharp fails,
	if (!blurhash)
		return {
			hash: 'x2O43ixuxu-;ofxu~qj[j[fQayfQ-;ayayayayj[~qj[ayj[j[j[?bfQayj[ayfQ~qayfQj[ayj[?bfQayayayfQ',
		}
	return blurhash
}
