import * as Types from '../../../__generated__/schema.generated';

export type LikedByQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  id: Types.Scalars['String'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type LikedByQuery = { __typename?: 'Query', seePost: { __typename?: 'Post', likedBy: { __typename?: 'PostLikedByConnection', edges: Array<Types.Maybe<{ __typename?: 'PostLikedByConnectionEdge', cursor: string, node: { __typename?: 'User', avatar: Types.Maybe<string>, firstName: string, lastName: Types.Maybe<string>, username: string, bio: Types.Maybe<string> } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } } };
