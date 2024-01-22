import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm'
import { Comment } from '../../comments/entities/comment.entity'
import { Category } from '@/server/domain/categories/entities/category.entity'
import { Poll } from '@/server/domain/polls/entities/poll.entity'
import { Tag } from '@/server/domain/types/enum/tags.enum'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column({ name: 'is_anonymous' })
  isAnonymous: boolean

  @Column('simple-array', {
    nullable: true,
  })
  tags: Tag[]

  @OneToMany('Comment', 'post', {
    lazy: true,
  })
  comments: Comment[]

  @OneToOne('Poll', 'post', {
    cascade: true,
    eager: true,
  })
  poll: Poll | null

  @ManyToOne('Category', 'posts', {
    onDelete: 'NO ACTION',
  })
  category: Category

  // Todo
  // user: User

  // stickers: Stickers

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date
}
