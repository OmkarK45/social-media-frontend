import * as Types from '../../../__generated__/schema.generated';

export type FollowUserMutationVariables = Types.Exact<{
  input: Types.FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'FollowResponse', ok: boolean } };

export type UnfollowUserMutationVariables = Types.Exact<{
  input: Types.FollowUserInput;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'FollowResponse', ok: boolean } };
