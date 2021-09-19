import * as Types from '../../../__generated__/schema.generated';

export type HashtagSearchQueryVariables = Types.Exact<{
  keyword: Types.Scalars['String'];
  first: Types.Scalars['Int'];
}>;


export type HashtagSearchQuery = { __typename?: 'Query', searchByHashtag: { __typename?: 'QuerySearchByHashtagConnection', edges: Array<Types.Maybe<{ __typename?: 'QuerySearchByHashtagConnectionEdge', node: { __typename?: 'Post', id: string, caption: Types.Maybe<string> } }>> } };

export type UserSearchQueryVariables = Types.Exact<{
  keyword: Types.Scalars['String'];
  first: Types.Scalars['Int'];
}>;


export type UserSearchQuery = { __typename?: 'Query', searchUser: { __typename?: 'QuerySearchUserConnection', edges: Array<Types.Maybe<{ __typename?: 'QuerySearchUserConnectionEdge', node: { __typename?: 'User', id: string } }>> } };
