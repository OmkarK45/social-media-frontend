import * as Types from '../../../__generated__/schema.generated';

export type UserPostsQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type UserPostsQuery = { __typename?: 'Query', seeProfile: { __typename?: 'ProfileResponse', user: { __typename?: 'User', posts: { __typename?: 'UserPostsConnection', edges: Array<Types.Maybe<{ __typename?: 'UserPostsConnectionEdge', node: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, gifImage: Types.Maybe<string>, image: Types.Maybe<string>, isLiked: boolean, caption: Types.Maybe<string>, blurHash: Types.Maybe<string>, totalComments: number, likes: number, isMine: boolean, user: { __typename?: 'User', avatar: Types.Maybe<string>, firstName: string, lastName: Types.Maybe<string>, username: string } } }>>, pageInfo: { __typename?: 'PageInfo', endCursor: Types.Maybe<string>, hasNextPage: boolean } } } } };
