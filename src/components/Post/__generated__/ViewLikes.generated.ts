import * as Types from '../../../__generated__/schema.generated';

export type LikedByQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  id: Types.Scalars['String'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type LikedByQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', likes: { __typename?: 'PostLikesConnection', edges: Array<{ __typename?: 'PostLikesConnectionEdge', cursor: string, node: { __typename?: 'Like', user: { __typename?: 'User', avatar: string, firstName: string, lastName: string | null, username: string, bio: string | null } } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } } };
