import { DomainService } from 'src/domain/domain-service/domain-service'
import { IPostQS } from '../post-qs-if'

export class GetPostsAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { token: string | null, userId: string, count: number, lastPostId: string | null }) {
        let {
            token,
            userId,
            count,
            lastPostId,
        } = params
        try {
            if (token != null) {
                const tokenError = await new DomainService().tokenCheck(token);
                if (tokenError === 'tokenError') {
                    return 'tokenError'
                }
                return await this.postQS.getPostsAllwithFavoStatus(userId, count, lastPostId)
            } else {
                return await this.postQS.getPostsAll(count, lastPostId)
            }
        } catch (error) {
            return error
        }
    }
}
