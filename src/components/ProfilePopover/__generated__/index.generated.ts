import * as Types from '../../../__generated__/schema.generated';

export type UserPopoverQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UserPopoverQuery = { __typename?: 'Query', seeProfile: { __typename?: 'ProfileResponse', user: { __typename?: 'User', id: string, avatar: Types.Maybe<string>, firstName: string, lastName: Types.Maybe<string>, username: string, stats: { __typename?: 'UserStatsObject', followersCount: number, followingCount: number, postsCount: number } } } };
