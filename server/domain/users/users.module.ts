import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/server/domain/users/entities/user.entity'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
