import { stripHexcode } from 'emojibase'
import BaseInterwave, {
	InterweaveProps as BaseInterwaveProps,
} from 'interweave'
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink'
import { EmojiMatcher, useEmojiData } from 'interweave-emoji'
import { useRouter } from 'next/router'
import { MentionMatcher } from './MentionMatcher'
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

export const hashTagMatcher = new HashtagMatcher('hashtag', {}, (args) => {
	const router = useRouter()

	function handleOnClick() {
		router.push(`/search/?query=${args.hashtag.split('#')[1]}&type=hashtag`)
	}

	return (
		<button className="font-medium underline" onClick={handleOnClick}>
			{args.hashtag}
		</button>
	)
})

export const mentionMatcher = new MentionMatcher('mention', {})

export function Interweave({
	content,
	matchers = [urlMatcher, emojiMatcher, hashTagMatcher, mentionMatcher],
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
			emojiSize={22}
			emojiSource={emojiSource}
			newWindow
			hashtagUrl={(hashtag: string) => `/hashtags/${hashtag}`}
			display={(display: string) => {
				return `/profile/${display}`
			}}
		/>
	)
}
