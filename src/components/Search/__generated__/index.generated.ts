import * as Types from '../../../__generated__/schema.generated';

export type HashtagSearchQueryVariables = Types.Exact<{
  keyword: Types.Scalars['String'];
  first: Types.Scalars['Int'];
}>;


export type HashtagSearchQuery = { __typename?: 'Query', searchByHashtag: { __typename?: 'QuerySearchByHashtagConnection', edges: Array<{ __typename?: 'QuerySearchByHashtagConnectionEdge', node: { __typename?: 'Post', id: string, caption: string | null, image: string | null, blurHash: string | null, gifImage: string | null, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, comments: { __typename?: 'PostCommentsConnection', totalCount: number }, user: { __typename?: 'User', firstName: string, lastName: string | null, username: string, avatar: string }, likes: { __typename?: 'PostLikesConnection', totalCount: number } } } | null> } };

export type UserSearchQueryVariables = Types.Exact<{
  keyword: Types.Scalars['String'];
  first: Types.Scalars['Int'];
}>;


export type UserSearchQuery = { __typename?: 'Query', searchUser: { __typename?: 'QuerySearchUserConnection', edges: Array<{ __typename?: 'QuerySearchUserConnectionEdge', node: { __typename?: 'User', id: string, avatar: string, username: string, firstName: string, lastName: string | null } } | null> } };
