import * as Types from '../../__generated__/schema.generated';

export type SessionQueryVariables = Types.Exact<{
  sessionId: Types.Scalars['String'];
}>;


export type SessionQuery = { __typename?: 'Query', sessionById: { __typename?: 'Session', id: string, createdAt: string, updatedAt: string, expiresAt: string | null } };
