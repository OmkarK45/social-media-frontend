import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { PostPageLayout } from '~/components/Common/Layouts/PostPageLayout'
import { Interweave } from '~/components/Interweave'
import { PostCard } from '~/components/Post/PostCard'
import { Heading } from '~/components/ui/Heading'

export default function Post() {
	const router = useRouter()
	const { id } = router.query
	return (
		<div className="mt-10">
			{/* POST PAGE */}
			{/* <Interweave content="😍😍😍😍😍😍 https://sushilburagute.github.io #OK #NOTOK Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, hic beatae? Laborum culpa et, similique eum exercitationem animi labore architecto debitis illo tenetur repudiandae cumque saepe non? Ratione, placeat iste." /> */}
			<PostCard />
		</div>
	)
}

Post.getLayout = function getLayout(page: ReactElement) {
	return <PostPageLayout>{page}</PostPageLayout>
}
