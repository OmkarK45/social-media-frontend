import * as Types from '../../../__generated__/schema.generated';

export type UserPostsQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type UserPostsQuery = { __typename?: 'Query', seeProfile: { __typename?: 'User', posts: { __typename?: 'UserPostsConnection', totalCount: number, edges: Array<{ __typename?: 'UserPostsConnectionEdge', node: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, gifImage: string | null, image: string | null, isLiked: boolean, caption: string | null, blurHash: string | null, isMine: boolean, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, likes: { __typename?: 'PostLikesConnection', totalCount: number }, user: { __typename?: 'User', avatar: string, firstName: string, lastName: string | null, username: string } } } | null>, pageInfo: { __typename?: 'PageInfo', endCursor: string | null, hasNextPage: boolean } } } };
