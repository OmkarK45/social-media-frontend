import * as Types from '../../../__generated__/schema.generated';

export type ToggleLikeMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: { __typename?: 'ResultResponse', success: boolean } };
