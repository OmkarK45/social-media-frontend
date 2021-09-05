import * as Types from '../../../__generated__/schema.generated';

export type LoginFormMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type LoginFormMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', success: boolean, user: { __typename?: 'User', username: string }, session: { __typename?: 'Session', id: string } } };
