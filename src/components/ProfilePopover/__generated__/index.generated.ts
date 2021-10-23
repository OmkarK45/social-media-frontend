import * as Types from '../../../__generated__/schema.generated';

export type UserPopoverQueryVariables = Types.Exact<{
  username: Types.Scalars['String'];
}>;


export type UserPopoverQuery = { __typename?: 'Query', seeProfile: { __typename?: 'User', id: string, avatar: string, firstName: string, lastName: Types.Maybe<string>, username: string, followersCount: number, followingCount: number, postsCount: number } };
