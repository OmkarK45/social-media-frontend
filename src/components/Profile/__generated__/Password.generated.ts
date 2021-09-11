import * as Types from '../../../__generated__/schema.generated';

export type ChangePasswordMutationVariables = Types.Exact<{
  input: Types.ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ResultResponse', success: boolean } };
