import * as Types from '../../../__generated__/schema.generated';

export type PostQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', id: string, caption: string | null, image: string | null, blurHash: string | null, gifImage: string | null, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, user: { __typename?: 'User', username: string, avatar: string }, likes: { __typename?: 'PostLikesConnection', totalCount: number } } };
