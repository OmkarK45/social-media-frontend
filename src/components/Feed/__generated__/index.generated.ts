import * as Types from '../../../__generated__/schema.generated';

export type FeedQueryVariables = Types.Exact<{
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'QueryFeedConnection', edges: Array<{ __typename?: 'QueryFeedConnectionEdge', cursor: string, node: { __typename?: 'Post', image: string | null, id: string, caption: string | null, blurHash: string | null, gifImage: string | null, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, likes: { __typename?: 'PostLikesConnection', totalCount: number }, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, user: { __typename?: 'User', id: string, username: string, firstName: string, avatar: string, lastName: string | null } } } | null>, pageInfo: { __typename?: 'PageInfo', endCursor: string | null, hasNextPage: boolean } } };
