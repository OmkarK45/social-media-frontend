import * as Types from '../../../__generated__/schema.generated';

export type LikedByQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  id: Types.Scalars['String'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type LikedByQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', likes: { __typename?: 'PostLikesConnection', edges: Array<Types.Maybe<{ __typename?: 'PostLikesConnectionEdge', cursor: string, node: { __typename?: 'Like', user: { __typename?: 'User', avatar: string, firstName: string, lastName: Types.Maybe<string>, username: string, bio: Types.Maybe<string> } } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } } };
