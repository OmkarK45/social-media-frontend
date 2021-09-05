import { Feed } from '~/components/Feed'
import Image from 'next/image'
import { Image as BlurImage } from '~/components/ui/Image'
import { Blurhash } from 'react-blurhash'
export default function FeedPage() {
	return (
		<>
			{/* <Feed /> */}
			<div>
				<BlurImage
					width={400}
					height={400}
					blurHash="UI7+7*$SWlsu=8sqbEssw?j]j]sl=8sqbEss"
					src="https://res.cloudinary.com/dogecorp/image/upload/v1630858417/dogesocial/v1/images/yca7gfzanqerpzjn4anz.jpg"
				/>
			</div>
		</>
	)
}
/** TODO : eslint*/
