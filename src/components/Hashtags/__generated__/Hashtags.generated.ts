import * as Types from '../../../__generated__/schema.generated';

export type PopularHashtagsQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type PopularHashtagsQuery = { __typename?: 'Query', popularHashtags: { __typename?: 'QueryPopularHashtagsConnection', edges: Array<{ __typename?: 'QueryPopularHashtagsConnectionEdge', cursor: string, node: { __typename?: 'Hashtag', id: string, hashtag: string } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };
