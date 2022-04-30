export class PostDTO {
    public readonly id: string
    public readonly imageUrl: string
    public readonly title: string
    public readonly text: string
    public readonly postedAt: Date
    public readonly favosCount: number
    public readonly commentsCount: number
    public readonly lastPostId: string

    public constructor(props: { id: string; imageUrl: string; title: string; text: string; postedAt: Date; favosCount: number; commentsCount: number; lastPostId: string }) {
        const { id, imageUrl, title, text, postedAt, favosCount, commentsCount, lastPostId } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.favosCount = favosCount
        this.commentsCount = commentsCount
        this.lastPostId = lastPostId
    }
}

export interface IPostQS {
    getAllPosts(count: number, lastPostId: string): Promise<PostDTO[]>
}