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
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { CommentDropdown } from './CommentDropdown'
import { Badge } from '../ui/Badge'

interface CommentsProps {
	postId: string
}

export const COMMENTS_QUERY = gql`
	query CommentsQuery($id: String!, $first: Int, $after: ID) {
		seePost(id: $id) {
			comments(first: $first, after: $after) {
				totalCount
				edges {
					cursor
					node {
						body
						id
						createdAt
						updatedAt
						isMine
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
	const { data, error, fetchMore } = useQuery<
		CommentsQuery,
		CommentsQueryVariables
	>(COMMENTS_QUERY, {
		variables: { id: postId, first: 3, after: null },
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'cache-first',
	})

	if (error) {
		return (
			<ErrorFallback
				icon={
					<HiOutlineExclamationCircle className="h-12 w-12 text-gray-500" />
				}
				noAction
				message="Failed to load comments for this post."
			/>
		)
	}

	return (
		<Card className="rounded-lg mb-2">
			<div className="relative">
				<div className="flow-root h-full ">
					<div className="py-3 px-4 border-b dark:border-gray-600 border-gray-200">
						<Heading size="h5">
							Comments ({data?.seePost.comments.totalCount})
						</Heading>
					</div>

					{!data || data.seePost.comments.totalCount === 0 ? (
						<div className="px-4 py-5 sm:p-6 flex items-start justify-center">
							<h1 className="text-muted font-medium text-center">
								There are no comments on this post. <br /> Be the first one to
								comment!
							</h1>
						</div>
					) : (
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
													src={edge?.node.user.avatar}
													alt=""
												/>
											</div>
											<div className=" flex w-full justify-between">
												<div className="flex-1 min-w-0">
													<div className="flex space-x-1">
														<p className="text-sm font-medium  truncate">
															{edge?.node.user.firstName}
														</p>
														{edge?.node.isMine ? (
															<Badge size="sm" variant="pink">
																You
															</Badge>
														) : null}
													</div>
													<p className="text-xs text-gray-500 truncate">
														{'@' + edge?.node.user.username}
													</p>
												</div>
												<div className="flex space-x-3 ">
													<time className="flex-shrink-0 flex-1 whitespace-nowrap text-xs text-gray-500">
														{formatDistance(
															new Date(edge?.node.createdAt!),
															new Date(),
															{ addSuffix: true }
														)}
													</time>

													<div>
														<CommentDropdown
															body={edge?.node.body!}
															id={edge?.node.id!}
															isMine={edge?.node.isMine!}
															postId={postId}
														/>
													</div>
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
					)}
				</div>
			</div>
		</Card>
	)
}
