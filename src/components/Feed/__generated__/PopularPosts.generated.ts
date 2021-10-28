import * as Types from '../../../__generated__/schema.generated';

export type PopularPostsQueryVariables = Types.Exact<{
  after: Types.Maybe<Types.Scalars['ID']>;
  orderBy: Types.Scalars['String'];
}>;


export type PopularPostsQuery = { __typename?: 'Query', popularPosts: { __typename?: 'QueryPopularPostsConnection', edges: Array<{ __typename?: 'QueryPopularPostsConnectionEdge', cursor: string, node: { __typename?: 'Post', image: string | null, id: string, caption: string | null, blurHash: string | null, gifImage: string | null, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, likes: { __typename?: 'PostLikesConnection', totalCount: number }, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, user: { __typename?: 'User', id: string, username: string, firstName: string, avatar: string, lastName: string | null } } } | null>, pageInfo: { __typename?: 'PageInfo', endCursor: string | null, hasNextPage: boolean } } };
