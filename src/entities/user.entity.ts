import { compare, hash } from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
