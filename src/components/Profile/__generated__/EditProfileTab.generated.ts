import * as Types from '../../../__generated__/schema.generated';

export type EditProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EditProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', username: string, firstName: string, bio: Types.Maybe<string>, lastName: Types.Maybe<string>, email: string, avatar: string, coverImage: string } };

export type EditProfileMutationVariables = Types.Exact<{
  input: Types.EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'User', bio: Types.Maybe<string>, username: string, firstName: string, lastName: Types.Maybe<string> } };
