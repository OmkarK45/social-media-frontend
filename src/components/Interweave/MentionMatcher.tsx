import { Matcher, MatchResponse } from 'interweave'
import { Link } from '../ui/Link'
import React from 'react'

export const MENTION_PATTERN = /\B@(\w+)/

export function Mention(props: any) {
	return (
		<Link href={`/profile/${props.display.replace('@', '')}`}>
			{props.display}
		</Link>
	)
}

export class MentionMatcher extends Matcher {
	replaceWith(match: string, props) {
		return React.createElement(Mention, props, match)
	}

	asTag(): string {
		return 'a'
	}

	match(string: string): MatchResponse<{
		display: string
	}> | null {
		return this.doMatch(string, MENTION_PATTERN, (matches) => {
			return {
				display: matches[0],
			}
		})
	}
}
