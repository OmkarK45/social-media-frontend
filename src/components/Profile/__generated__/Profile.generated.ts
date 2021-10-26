import * as Types from '../../../__generated__/schema.generated';

export type SeeProfileQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile: { __typename?: 'User', id: string, bio: string | null, avatar: string, username: string, lastName: string | null, firstName: string, createdAt: string, updatedAt: string, coverImage: string, coverImageBg: string, isMe: boolean, isFollowing: boolean, followersCount: number, postsCount: number, followingCount: number } };
