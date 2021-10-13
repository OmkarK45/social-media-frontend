import * as Types from '../../../__generated__/schema.generated';

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'ResultResponse', success: boolean } };
