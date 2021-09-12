import { stripHexcode } from 'emojibase'
import BaseInterwave, {
	InterweaveProps as BaseInterwaveProps,
} from 'interweave'
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink'
import { EmojiMatcher, useEmojiData } from 'interweave-emoji'
import { Url } from './UrlFactory'

const emojiOptions = {
	convertEmoticon: false,
	convertShortcode: true,
	convertUnicode: true,
	enlargeThreshold: 3,
}

export const urlMatcher = new UrlMatcher(
	'url',
	{
		customTLDs: ['app'],
	},
	Url
)

export const emojiMatcher = new EmojiMatcher('emoji', emojiOptions)

export const hashTagMatcher = new HashtagMatcher('hashtag')

export function Interweave({
	content,
	matchers = [urlMatcher, emojiMatcher, hashTagMatcher],
	...props
}: BaseInterwaveProps) {
	const [, emojiSource] = useEmojiData({
		throwErrors: false,
	})

	return (
		<BaseInterwave
			content={content}
			matchers={matchers}
			{...props}
			emojiPath={(hexcode: string, large: boolean) => {
				// return `https://twemoji.maxcdn.com/2/svg/${hexcode.toLowerCase()}.svg`
				return `https://cdn.jsdelivr.net/gh/joypixels/emoji-assets@latest/png/${
					large ? 64 : 32
				}/${stripHexcode(hexcode).toLowerCase()}.png`
			}}
			emojiSource={emojiSource}
			newWindow
			hashtagUrl={(hashtag: string) => `/hashtags/${hashtag}`}
		/>
	)
}
