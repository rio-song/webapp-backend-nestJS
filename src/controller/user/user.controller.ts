import { Body, Controller, Get, Post, Put, Param, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserQS } from 'src/infra/user/user-qs'
import { PutUserUseCase } from 'src/app/user/usecase/put-user-usecase'
import { UserRepository } from 'src/infra/user/user-repository'
import { GetUserResponse } from './response/get-user-response'
import { GetUserUseCase } from 'src/app/user/usecase/get-user-usecase'
import { PutUserRequest } from './request/put-user-request'
import { PostUserUseCase } from 'src/app/user/usecase/post-user-usecase'
import { PostUserRequest } from './request/post-user-request'
import { PostPutUserResponse } from './response/post-put-user-response'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException, BadRequestEmailException } from '../../util/error'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('ユーザー機能')
@Controller({
    path: 'api/user',
})
export class UserController {
    @Get('/userId/:userId')
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 400, description: '入力に誤りがあります。(BadRequest)' })
    @ApiResponse({ status: 401, description: '認証エラーが発生しました(tokenError)' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })

    async getUser(
        @Param() param,
        @Headers('token') token: string,
    ): Promise<GetUserResponse> {
        const prisma = new PrismaClient()
        const qs = new UserQS(prisma)
        const usecase = new GetUserUseCase(qs)
        try {
            const result = await usecase.do({
                token: token,
                userId: param.userId
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            const response = new GetUserResponse({ Users: result })
            return response
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 400, description: '入力に誤りがあります。(BadRequest)' })
    @ApiResponse({ status: 400, description: 'メールアドレスが重複しています。(BadRequest)' })
    @ApiResponse({ status: 401, description: '認証エラーが発生しました(tokenError)' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })

    async postUser(
        @Body() postUserDto: PostUserRequest,
    ): Promise<PostPutUserResponse> {
        const prisma = new PrismaClient()
        const userRepo = new UserRepository(prisma)
        const usecase = new PostUserUseCase(userRepo)
        try {
            const result = await usecase.do({
                firstName: postUserDto.firstName,
                familyName: postUserDto.familyName,
                nickName: postUserDto.nickName,
                imageUrl: postUserDto.imageUrl,
                email: postUserDto.email,
                password: postUserDto.password,
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            if (result === 'emailDoubleError') {
                throw new BadRequestEmailException();
            }
            const response = new PostPutUserResponse(result)
            return response
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }

            if (e.name === 'BadRequestException') {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }

    @Put('/userId/:userId')
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 400, description: '入力に誤りがあります。(BadRequest)' })
    @ApiResponse({ status: 400, description: 'メールアドレスが重複しています。(BadRequest)' })
    @ApiResponse({ status: 401, description: '認証エラーが発生しました(tokenError)' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })

    async putUser(
        @Param('userId') userId: string,
        @Headers('token') token: string,
        @Body() putUserDto: PutUserRequest,
    ): Promise<PostPutUserResponse> {
        const prisma = new PrismaClient()
        const userRepo = new UserRepository(prisma)
        const usecase = new PutUserUseCase(userRepo)

        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                firstName: putUserDto.firstName,
                familyName: putUserDto.familyName,
                nickName: putUserDto.nickName,
                imageUrl: putUserDto.imageUrl,
                profileText: putUserDto.profileText,
                email: putUserDto.email,
                password: putUserDto.password,
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            if (result === 'emailDoubleError') {
                throw new BadRequestEmailException();
            }

            const response = new PostPutUserResponse(result)
            return
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            if (e.name === 'BadRequestException') {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }
}
