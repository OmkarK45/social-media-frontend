export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  /** The `Upload` scalar type represents a file upload. */
  FileUpload: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  session: Session;
  success: Scalars['Boolean'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isMine: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CreateCommentInput = {
  body: Scalars['String'];
  postId: Scalars['String'];
};

export type CreateCommentObject = {
  __typename?: 'CreateCommentObject';
  body: Scalars['String'];
  id: Scalars['String'];
};

export type CreatePostInput = {
  caption: Scalars['String'];
  gifLink: Maybe<Scalars['String']>;
  media: Maybe<Scalars['FileUpload']>;
};


export type EditCommentInput = {
  body: Scalars['String'];
  id: Scalars['String'];
  postId: Scalars['String'];
};

export type EditPostInput = {
  caption: Scalars['String'];
  gifLink: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type EditProfileInput = {
  avatar: Maybe<Scalars['FileUpload']>;
  bio: Maybe<Scalars['String']>;
  coverImage: Maybe<Scalars['FileUpload']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};


export type FollowUserInput = {
  username: Scalars['String'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  hashtag: Scalars['String'];
  id: Scalars['ID'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ResultResponse;
  createComment: CreateCommentObject;
  createPost: Post;
  deleteComment: ResultResponse;
  deletePost: ResultResponse;
  editComment: ResultResponse;
  editPost: Post;
  editProfile: User;
  followUser: User;
  logout: ResultResponse;
  searchUser: MutationSearchUserConnection;
  signIn: AuthResponse;
  signUp: AuthResponse;
  toggleLike: ResultResponse;
  unfollowUser: User;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditCommentArgs = {
  input: EditCommentInput;
};


export type MutationEditPostArgs = {
  input: EditPostInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationSearchUserArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  keyword: Scalars['String'];
  last: Maybe<Scalars['Int']>;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationToggleLikeArgs = {
  id: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  input: FollowUserInput;
};

export type MutationSearchUserConnection = {
  __typename?: 'MutationSearchUserConnection';
  edges: Array<Maybe<MutationSearchUserConnectionEdge>>;
  pageInfo: PageInfo;
};

export type MutationSearchUserConnectionEdge = {
  __typename?: 'MutationSearchUserConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Maybe<Scalars['String']>;
};

export type Post = Node & {
  __typename?: 'Post';
  blurHash: Maybe<Scalars['String']>;
  caption: Maybe<Scalars['String']>;
  comments: PostCommentsConnection;
  createdAt: Scalars['DateTime'];
  gifImage: Maybe<Scalars['String']>;
  hashtags: PostHashtagsConnection;
  id: Scalars['ID'];
  image: Maybe<Scalars['String']>;
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likedBy: PostLikedByConnection;
  likes: Scalars['Int'];
  totalComments: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};


export type PostCommentsArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type PostHashtagsArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type PostLikedByArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type PostCommentsConnection = {
  __typename?: 'PostCommentsConnection';
  edges: Array<Maybe<PostCommentsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type PostCommentsConnectionEdge = {
  __typename?: 'PostCommentsConnectionEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type PostHashtagsConnection = {
  __typename?: 'PostHashtagsConnection';
  edges: Array<Maybe<PostHashtagsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type PostHashtagsConnectionEdge = {
  __typename?: 'PostHashtagsConnectionEdge';
  cursor: Scalars['String'];
  node: Hashtag;
};

export type PostLikedByConnection = {
  __typename?: 'PostLikedByConnection';
  edges: Array<Maybe<PostLikedByConnectionEdge>>;
  pageInfo: PageInfo;
};

export type PostLikedByConnectionEdge = {
  __typename?: 'PostLikedByConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  user: User;
};

export type Query = {
  __typename?: 'Query';
  feed: QueryFeedConnection;
  health: Scalars['String'];
  me: User;
  node: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  postsByHashtag: QueryPostsByHashtagConnection;
  seeLikes: QuerySeeLikesConnection;
  seePost: Post;
  seeProfile: ProfileResponse;
  sessionById: Session;
};


export type QueryFeedArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPostsByHashtagArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  hashtag: Scalars['String'];
  last: Maybe<Scalars['Int']>;
};


export type QuerySeeLikesArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  last: Maybe<Scalars['Int']>;
};


export type QuerySeePostArgs = {
  id: Scalars['String'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};


export type QuerySessionByIdArgs = {
  id: Scalars['String'];
};

export type QueryFeedConnection = {
  __typename?: 'QueryFeedConnection';
  edges: Array<Maybe<QueryFeedConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryFeedConnectionEdge = {
  __typename?: 'QueryFeedConnectionEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type QueryPostsByHashtagConnection = {
  __typename?: 'QueryPostsByHashtagConnection';
  edges: Array<Maybe<QueryPostsByHashtagConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryPostsByHashtagConnectionEdge = {
  __typename?: 'QueryPostsByHashtagConnectionEdge';
  cursor: Scalars['String'];
  node: Post;
};

export type QuerySeeLikesConnection = {
  __typename?: 'QuerySeeLikesConnection';
  edges: Array<Maybe<QuerySeeLikesConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QuerySeeLikesConnectionEdge = {
  __typename?: 'QuerySeeLikesConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type ResultResponse = {
  __typename?: 'ResultResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  total: Scalars['Int'];
  users: Array<User>;
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime'];
  expiresAt: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  avatar: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  coverImage: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers: UserFollowersConnection;
  following: UserFollowingConnection;
  id: Scalars['ID'];
  lastName: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};


export type UserFollowersArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type UserFollowingArgs = {
  after: Maybe<Scalars['ID']>;
  before: Maybe<Scalars['ID']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type UserFollowersConnection = {
  __typename?: 'UserFollowersConnection';
  edges: Array<Maybe<UserFollowersConnectionEdge>>;
  pageInfo: PageInfo;
};

export type UserFollowersConnectionEdge = {
  __typename?: 'UserFollowersConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserFollowingConnection = {
  __typename?: 'UserFollowingConnection';
  edges: Array<Maybe<UserFollowingConnectionEdge>>;
  pageInfo: PageInfo;
};

export type UserFollowingConnectionEdge = {
  __typename?: 'UserFollowingConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};
