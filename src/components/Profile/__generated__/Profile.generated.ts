import * as Types from '../../../__generated__/schema.generated';

export type SeeProfileQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile: { __typename?: 'ProfileResponse', user: { __typename?: 'User', id: string, bio: Types.Maybe<string>, avatar: Types.Maybe<string>, username: string, lastName: Types.Maybe<string>, firstName: string, createdAt: string, updatedAt: string, coverImage: Types.Maybe<string>, isMe: boolean, isFollowing: boolean, stats: { __typename?: 'UserStatsObject', followersCount: number, followingCount: number, postsCount: number } } } };
