import * as Types from '../../__generated__/schema.generated';

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', username: string, firstName: string, lastName: string | null, id: string, avatar: string, coverImage: string, coverImageBg: string, bio: string | null, email: string } };
