import * as Types from '../../../../__generated__/schema.generated';

export type WhoToFollowQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type WhoToFollowQuery = { __typename?: 'Query', whoToFollow: { __typename?: 'QueryWhoToFollowConnection', edges: Array<{ __typename?: 'QueryWhoToFollowConnectionEdge', node: { __typename?: 'User', id: string, avatar: string, username: string, firstName: string, lastName: string | null, isFollowing: boolean } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };
