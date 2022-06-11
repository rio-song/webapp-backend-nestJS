import { DomainService } from 'src/domain/domain-service/domain-service'
import { favoVO } from 'src/domain/entity/favoVO'
import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'

export class PostFavoUseCase {
    private readonly favoRepo: IFavoRepository

    public constructor(favoRepo: IFavoRepository) {
        this.favoRepo = favoRepo
    }

    public async do(params: { token: string, userId: string, postId: string, }) {
        if (params.token == null || params.token == undefined || params.token == ""
            || params.userId == null || params.userId == undefined || params.userId == ""
            || params.postId == null || params.postId == undefined || params.postId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        const {
            token,
            userId,
            postId,
        } = params
        const tokenError = await new DomainService().tokenCheck(token);
        if (tokenError === 'tokenError') {
            return 'tokenError'
        }
        const favoEntity = new favoVO({
            userId,
            postId,
        })
        await this.favoRepo.save(favoEntity);
    }
}
