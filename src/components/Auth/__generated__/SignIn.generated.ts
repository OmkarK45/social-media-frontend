import * as Types from '../../../__generated__/schema.generated';

export type LoginMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', success: boolean, user: { __typename?: 'User', username: string }, session: { __typename?: 'Session', id: string } } };
