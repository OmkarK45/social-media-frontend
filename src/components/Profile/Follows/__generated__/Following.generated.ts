import * as Types from '../../../../__generated__/schema.generated';

export type FollowingListQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FollowingListQuery = { __typename?: 'Query', seeProfile: { __typename?: 'User', following: { __typename?: 'UserFollowingConnection', edges: Array<{ __typename?: 'UserFollowingConnectionEdge', cursor: string, node: { __typename?: 'User', username: string, avatar: string, firstName: string, lastName: string | null, bio: string | null, isMe: boolean, isFollowing: boolean } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } } };
