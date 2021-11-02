import type { Prisma, User, Session, Post, Like, Hashtag, Comment, Notification } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Shape: User;
        Include: Prisma.UserInclude;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "posts" | "likes" | "comments" | "followers" | "following" | "sessions" | "receivedNotification" | "dispatchedNotification";
        ListRelations: "posts" | "likes" | "comments" | "followers" | "following" | "sessions" | "receivedNotification" | "dispatchedNotification";
        Relations: {
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
            comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
            followers: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            following: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
            sessions: {
                Shape: Session[];
                Types: PrismaTypes["Session"];
            };
            receivedNotification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
            dispatchedNotification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Session: {
        Shape: Session;
        Include: Prisma.SessionInclude;
        Where: Prisma.SessionWhereUniqueInput;
        Fields: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Post: {
        Shape: Post;
        Include: Prisma.PostInclude;
        Where: Prisma.PostWhereUniqueInput;
        Fields: "user" | "likes" | "hashtags" | "comments" | "notification";
        ListRelations: "likes" | "hashtags" | "comments" | "notification";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            likes: {
                Shape: Like[];
                Types: PrismaTypes["Like"];
            };
            hashtags: {
                Shape: Hashtag[];
                Types: PrismaTypes["Hashtag"];
            };
            comments: {
                Shape: Comment[];
                Types: PrismaTypes["Comment"];
            };
            notification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Like: {
        Shape: Like;
        Include: Prisma.LikeInclude;
        Where: Prisma.LikeWhereUniqueInput;
        Fields: "post" | "user" | "Notification";
        ListRelations: "Notification";
        Relations: {
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            Notification: {
                Shape: Notification[];
                Types: PrismaTypes["Notification"];
            };
        };
    };
    Hashtag: {
        Shape: Hashtag;
        Include: Prisma.HashtagInclude;
        Where: Prisma.HashtagWhereUniqueInput;
        Fields: "posts";
        ListRelations: "posts";
        Relations: {
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
        };
    };
    Comment: {
        Shape: Comment;
        Include: Prisma.CommentInclude;
        Where: Prisma.CommentWhereUniqueInput;
        Fields: "user" | "post";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            post: {
                Shape: Post;
                Types: PrismaTypes["Post"];
            };
        };
    };
    Notification: {
        Shape: Notification;
        Include: Prisma.NotificationInclude;
        Where: Prisma.NotificationWhereUniqueInput;
        Fields: "receiver" | "dispatcher" | "like" | "post";
        ListRelations: never;
        Relations: {
            receiver: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            dispatcher: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            like: {
                Shape: Like | null;
                Types: PrismaTypes["Like"];
            };
            post: {
                Shape: Post | null;
                Types: PrismaTypes["Post"];
            };
        };
    };
}