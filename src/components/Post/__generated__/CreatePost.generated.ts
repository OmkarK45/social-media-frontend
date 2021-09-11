import * as Types from '../../../__generated__/schema.generated';

export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };
