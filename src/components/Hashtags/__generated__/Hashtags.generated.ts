import * as Types from '../../../__generated__/schema.generated';

export type PopularHashtagsQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type PopularHashtagsQuery = { __typename?: 'Query', popularHashtags: { __typename?: 'QueryPopularHashtagsConnection', edges: Array<Types.Maybe<{ __typename?: 'QueryPopularHashtagsConnectionEdge', cursor: string, node: { __typename?: 'Hashtag', id: string, hashtag: string } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } };
