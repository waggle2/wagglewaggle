import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeormConfig } from '@/server/config/typeorm.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ItemsModule } from '@/server/domain/items/items.module'
import { UsersModule } from '@/server/domain/users/users.module'
import { PollItemsModule } from '@/server/domain/pollItems/pollItems.module'
import { CategoriesModule } from '@/server/domain/categories/categories.module'
import { PollsModule } from '@/server/domain/polls/polls.module'
import { CommentsModule } from '@/server/domain/comments/comments.module'
import { PostsModule } from '@/server/domain/posts/posts.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeormConfig,
    }),
    PostsModule,
    CommentsModule,
    PollsModule,
    CategoriesModule,
    PollItemsModule,
    UsersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
