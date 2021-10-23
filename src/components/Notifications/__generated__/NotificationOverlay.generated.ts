import * as Types from '../../../__generated__/schema.generated';

export type NotificationsQueryVariables = Types.Exact<{
  first: Types.Scalars['Int'];
  after: Types.Maybe<Types.Scalars['ID']>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'QueryNotificationsConnection', edges: Array<Types.Maybe<{ __typename?: 'QueryNotificationsConnectionEdge', cursor: string, node: { __typename?: 'Notification', isRead: boolean, id: string, type: string, createdAt: string, dispatcher: { __typename?: 'User', id: string, avatar: string, firstName: string, lastName: Types.Maybe<string>, username: string }, post: Types.Maybe<{ __typename?: 'Post', id: string }>, like: Types.Maybe<{ __typename?: 'Like', id: string, user: { __typename?: 'User', avatar: string, firstName: string, lastName: Types.Maybe<string>, username: string } }> } }>>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: Types.Maybe<string> } } };
