import * as Types from '../../../__generated__/schema.generated';

export type SignUpMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthResponse', success: boolean, session: { __typename?: 'Session', id: string }, user: { __typename?: 'User', username: string } } };
