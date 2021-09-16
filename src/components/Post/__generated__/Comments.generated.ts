import * as Types from '../../../__generated__/schema.generated';

export type CommentsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  first: Types.Maybe<Types.Scalars['Int']>;
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type CommentsQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', comments: { __typename?: 'PostCommentsConnection', edges: Array<Types.Maybe<{ __typename?: 'PostCommentsConnectionEdge', cursor: string, node: { __typename?: 'Comment', body: string, id: string, user: { __typename?: 'User', id: string, avatar: Types.Maybe<string>, username: string, firstName: string } } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } } };
