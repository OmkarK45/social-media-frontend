import * as Types from '../../../__generated__/schema.generated';

export type NotificationsQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'QueryNotificationsConnection', edges: Array<{ __typename?: 'QueryNotificationsConnectionEdge', cursor: string, node: { __typename?: 'Notification', isRead: boolean, id: string, type: string, createdAt: string, dispatcher: { __typename?: 'User', id: string, avatar: string, firstName: string, lastName: string | null, username: string }, post: { __typename?: 'Post', id: string } | null, like: { __typename?: 'Like', id: string, post: { __typename?: 'Post', id: string }, user: { __typename?: 'User', avatar: string, firstName: string, lastName: string | null, username: string } } | null } } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };
