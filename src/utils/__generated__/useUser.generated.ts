import * as Types from '../../__generated__/schema.generated';

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', username: string, firstName: string, id: string, avatar: string } };
