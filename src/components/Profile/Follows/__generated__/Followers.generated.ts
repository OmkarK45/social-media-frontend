import * as Types from '../../../../__generated__/schema.generated';

export type FollowersListQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FollowersListQuery = { __typename?: 'Query', seeProfile: { __typename?: 'ProfileResponse', user: { __typename?: 'User', followers: { __typename?: 'UserFollowersConnection', edges: Array<Types.Maybe<{ __typename?: 'UserFollowersConnectionEdge', cursor: string, node: { __typename?: 'User', username: string, avatar: Types.Maybe<string>, firstName: string, lastName: Types.Maybe<string>, bio: Types.Maybe<string>, isMe: boolean, isFollowing: boolean } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } } } };
