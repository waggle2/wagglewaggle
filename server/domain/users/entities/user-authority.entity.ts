import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'
import { AuthorityName } from '@/server/domain/types/enum/users.enum'
import { Animal } from '@/server/domain/types/enum/animal.enum'

@Entity({ name: 'user_authorities' })
export class UserAuthority {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne('User', 'authorities', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'authority_name', type: 'enum', enum: AuthorityName })
  authorityName: AuthorityName
}
