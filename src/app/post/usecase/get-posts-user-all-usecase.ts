import { IPostQS } from '../post-qs-if'

export class GetPostsUserAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { _token: string, userId: string, count: number, lastPostId: string | null }) {
        let {
            userId,
            count,
            lastPostId,
            _token,
        } = params
        try {
            return await this.postQS.getPostsUserAll(_token, userId, count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
