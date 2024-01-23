import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Comment } from '@/server/domain/comments/entities/comment.entity'
import { Post } from '@/server/domain/posts/entities/post.entity'
import { User } from '@/server/domain/users/entities/user.entity'
import { Item } from '@/server/domain/items/entities/item.entity'
import { PollItem } from '@/server/domain/pollItems/entities/pollItem.entity'
import { Poll } from '@/server/domain/polls/entities/poll.entity'
import { Category } from '@/server/domain/categories/entities/category.entity'
import { UserAuthority } from '@/server/domain/users/entities/user-authority.entity'
import { Credential } from '@/server/domain/users/entities/credential.entity'

export function TypeormConfig(configService: ConfigService) {
  const env = configService.get('NODE_ENV')
  const logging = configService.get<string>('DB_LOGGING') === 'true'
  const DB_TYPE: 'mysql' | null = 'mysql'
  const isDev = env !== 'prod'

  const option: TypeOrmModuleOptions = {
    type: DB_TYPE,
    host: configService.get(`DB_HOST`),
    port: configService.get(`DB_PORT`),
    username: configService.get(`DB_USERNAME`),
    password: configService.get(`DB_PASSWORD`),
    database: configService.get(`DB_NAME`),
    entities: [
      Post,
      Comment,
      User,
      UserAuthority,
      Credential,
      Item,
      Poll,
      PollItem,
      Category,
    ],
    synchronize: isDev,
    // dropSchema: isDev,
    logging: logging,
  }

  return option
}
