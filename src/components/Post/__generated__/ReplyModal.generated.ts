import * as Types from '../../../__generated__/schema.generated';

export type CreateCommentMutationVariables = Types.Exact<{
  input: Types.CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'ResultResponse', success: boolean } };
