import * as Types from '../../../__generated__/schema.generated';

export type FeedQueryVariables = Types.Exact<{
  first?: Types.Maybe<Types.Scalars['Int']>;
  after?: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'QueryFeedConnection', edges: Array<Types.Maybe<{ __typename?: 'QueryFeedConnectionEdge', cursor: string, node: { __typename?: 'Post', image?: Types.Maybe<string>, id: string, user: { __typename?: 'User', username: string } } }>>, pageInfo: { __typename?: 'PageInfo', endCursor?: Types.Maybe<string>, hasNextPage: boolean } } };
