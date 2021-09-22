import * as Types from '../../../../__generated__/schema.generated';

export type FollowingListQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FollowingListQuery = { __typename?: 'Query', seeProfile: { __typename?: 'ProfileResponse', user: { __typename?: 'User', following: { __typename?: 'UserFollowingConnection', edges: Array<Types.Maybe<{ __typename?: 'UserFollowingConnectionEdge', cursor: string, node: { __typename?: 'User', username: string, avatar: Types.Maybe<string>, firstName: string, lastName: Types.Maybe<string>, bio: Types.Maybe<string> } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } } } };
