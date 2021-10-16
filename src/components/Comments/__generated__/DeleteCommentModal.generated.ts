import * as Types from '../../../__generated__/schema.generated';

export type DeleteCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'ResultResponse', success: boolean } };
