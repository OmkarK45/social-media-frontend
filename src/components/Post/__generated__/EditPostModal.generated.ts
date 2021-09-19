import * as Types from '../../../__generated__/schema.generated';

export type EditPostMutationVariables = Types.Exact<{
  input: Types.EditPostInput;
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'Post', caption: Types.Maybe<string>, id: string } };
