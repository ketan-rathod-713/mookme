import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class StepContent {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  command: string;

  @IsString()
  @IsOptional()
  onlyOn?: string;

  @IsBoolean()
  @IsOptional()
  serial?: string;
}

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  rawContent: string;

  @ManyToOne(() => User, (user) => user.steps)
  owner: User;

  protected content: StepContent;

  @AfterLoad()
  getParsedContent() {
    this.content = JSON.parse(this.rawContent) as StepContent;
  }
}