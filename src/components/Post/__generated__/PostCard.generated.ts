import * as Types from '../../../__generated__/schema.generated';

export type PostQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', id: string, caption: Types.Maybe<string>, image: Types.Maybe<string>, blurHash: Types.Maybe<string>, gifImage: Types.Maybe<string>, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, user: { __typename?: 'User', username: string, avatar: string }, likes: { __typename?: 'PostLikesConnection', totalCount: number } } };
