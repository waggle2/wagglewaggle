import { Module } from '@nestjs/common'
import { PollsService } from './polls.service'
import { PollsController } from './polls.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Poll } from './entities/poll.entity'
import { Post } from '../posts/entities/post.entity'
import { PostsModule } from '@/server/domain/posts/posts.module'
import { PollItemsModule } from '@/server/domain/pollItems/pollItems.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Poll, Post]),
    PostsModule,
    PollItemsModule,
  ],
  controllers: [PollsController],
  providers: [PollsService],
})
export class PollsModule {}
