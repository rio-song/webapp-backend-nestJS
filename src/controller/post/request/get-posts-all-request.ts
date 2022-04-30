// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetPostsAllRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly count!: number

    @ApiProperty()
    readonly lastPostId!: string | null
}