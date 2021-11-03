import * as Types from '../../../__generated__/schema.generated';

export type EditProfileMutationVariables = Types.Exact<{
  input: Types.EditProfileInput;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'User', bio: string | null, username: string, firstName: string, lastName: string | null } };
