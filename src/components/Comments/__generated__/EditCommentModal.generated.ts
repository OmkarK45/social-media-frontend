import * as Types from '../../../__generated__/schema.generated';

export type EditCommentMutationVariables = Types.Exact<{
  input: Types.EditCommentInput;
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'ResultResponse', success: boolean } };
