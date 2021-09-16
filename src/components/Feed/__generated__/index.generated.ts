import * as Types from '../../../__generated__/schema.generated';

export type FeedQueryVariables = Types.Exact<{
  first: Types.Maybe<Types.Scalars['Int']>;
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'QueryFeedConnection', edges: Array<Types.Maybe<{ __typename?: 'QueryFeedConnectionEdge', cursor: string, node: { __typename?: 'Post', image: Types.Maybe<string>, id: string, caption: Types.Maybe<string>, blurHash: Types.Maybe<string>, likes: number, totalComments: number, gifImage: Types.Maybe<string>, isMine: boolean, isLiked: boolean, createdAt: string, updatedAt: string, user: { __typename?: 'User', username: string, firstName: string, avatar: Types.Maybe<string>, lastName: Types.Maybe<string> } } }>>, pageInfo: { __typename?: 'PageInfo', endCursor: Types.Maybe<string>, hasNextPage: boolean } } };
