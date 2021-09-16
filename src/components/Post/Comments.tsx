/* eslint-disable @next/next/no-img-element */
import { Heading } from '../ui/Heading'
import { Card } from '~/components/ui/Card'
import { gql, useQuery } from '@apollo/client'
import {
	CommentsQuery,
	CommentsQueryVariables,
} from './__generated__/Comments.generated'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingFallback } from '../ui/Fallbacks/LoadingFallback'
import { formatDistance } from 'date-fns'

const people = [
	{
		name: 'Leonard Krasner',
		handle: 'leonardkrasner',
		imageUrl:
			'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Floyd Miles',
		handle: 'floydmiles',
		imageUrl:
			'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Emily Selman',
		handle: 'emilyselman',
		imageUrl:
			'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson 1',
		handle: 'kristinwatson 1',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson 2',
		handle: 'kristinwatson 2',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Kristin Watson 4',
		handle: 'kristinwatson 3',
		imageUrl:
			'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
]

interface CommentsProps {
	postId: string
}

export const COMMENTS_QUERY = gql`
	query CommentsQuery($id: String!, $first: Int, $after: ID) {
		seePost(id: $id) {
			totalComments
			comments(first: $first, after: $after) {
				edges {
					cursor
					node {
						body
						id
						createdAt
						updatedAt
						user {
							id
							avatar
							username
							firstName
						}
					}
				}
				pageInfo {
					hasNextPage
					endCursor
				}
			}
		}
	}
`

export function Comments({ postId }: CommentsProps) {
	const { data, error, loading, fetchMore } = useQuery<
		CommentsQuery,
		CommentsQueryVariables
	>(COMMENTS_QUERY, {
		variables: { id: postId, first: 2, after: null },
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-first',
	})

	if (error) {
		console.log(error.message)
		return <div>An error occurred</div>
	}
	if (!data) return <div>TODO</div>

	return (
		<Card className="rounded-lg mb-2">
			<div className="relative">
				<div className="flow-root h-full ">
					<div className="py-3 px-4 border-b dark:border-gray-600 border-gray-200">
						<Heading size="h5">Comments ({data.seePost.totalComments})</Heading>
					</div>
					<div className="px-4 py-5 sm:p-6 flex items-start justify-center">
						<h1 className="text-muted font-medium text-center">
							There are no comments on this post. <br /> Be the first one to
							comment!
						</h1>
					</div>
					<ul
						role="list"
						className="divide-y divide-gray-200 dark:divide-gray-600 mb-2"
					>
						<InfiniteScroll
							hasMore={data.seePost.comments.pageInfo.hasNextPage}
							next={() => {
								fetchMore({
									variables: {
										first: 3,
										after: data.seePost.comments.pageInfo.endCursor,
									},
								})
							}}
							dataLength={data.seePost.comments.edges.length}
							loader={<LoadingFallback />}
							endMessage={<h1>All done</h1>}
						>
							{data.seePost.comments.edges.map((edge) => (
								<li
									key={edge?.cursor}
									className="py-4 px-4 border-b border-gray-300 dark:border-gray-700"
									id={edge?.node.id}
								>
									<div className="flex items-center  space-x-4">
										<div className="flex-shrink-0">
											<img
												className="h-10 w-10 rounded-full"
												src={edge?.node.user.avatar ?? ''}
												alt=""
											/>
										</div>
										<div className=" flex w-full justify-between">
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium  truncate">
													{edge?.node.user.firstName}
												</p>
												<p className="text-xs text-gray-500 truncate">
													{'@' + edge?.node.user.username}
												</p>
											</div>
											<div>
												<time className="flex-shrink-0 flex-1 whitespace-nowrap text-xs text-gray-500">
													{formatDistance(
														new Date(edge?.node.createdAt!),
														new Date(),
														{ addSuffix: true }
													)}
												</time>
											</div>
										</div>
									</div>
									<div className="mt-2">
										<p className="text-sm dark:text-gray-300 ">
											{edge?.node.body}
										</p>
									</div>
								</li>
							))}
						</InfiniteScroll>
					</ul>
				</div>
			</div>
		</Card>
	)
}
