export class PostDetailDTO {
    public readonly id: string
    public readonly imageUrl: string
    public readonly title: string
    public readonly text: string
    public readonly postedAt: Date
    public readonly favosCount: number
    public readonly favo: boolean
    public readonly nickName: string
    public readonly userId: string
    public readonly commentsCount: number
    public readonly comments: CommentDTO[]

    public constructor(props: {
        id: string; imageUrl: string; title: string; text: string; postedAt: Date; favosCount: number; favo: boolean;
        nickName: string; userId: string; commentsCount: number; comments: CommentDTO[];
    }) {
        const { id, imageUrl, title, text, postedAt, nickName, userId,
            favosCount, favo, commentsCount, comments } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.favosCount = favosCount
        this.favo = favo
        this.commentsCount = commentsCount
        this.comments = comments
        this.nickName = nickName
        this.userId = userId
    }
}

export interface IPostDetailQS {
    getPostDetail(postId: string, userId: string): Promise<PostDetailDTO>
}

export class CommentDTO {
    public readonly id: string
    public readonly comment: string
    public readonly commentedUserId: string
    public readonly commentededAt: Date

    public constructor(props: {
        id: string;
        comment: string
        commentedUserId: string
        commentededAt: Date
    }) {
        const { id, comment, commentedUserId, commentededAt } = props
        this.id = id
        this.comment = comment
        this.commentedUserId = commentedUserId
        this.commentededAt = commentededAt
    }
}