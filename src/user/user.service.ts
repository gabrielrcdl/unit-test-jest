/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: any): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problema para criar um usuário');
    }
    return userSaved;
  }

  async update(id: string, data: UpdateUserInput): Promise<User>{
    const user = await this.findOne(id)

    await this.userRepository.update(user, {...data})
    const userUpdated = this.userRepository.create({...user, ...data})
    return userUpdated
  } 

  async delete(id: string): Promise<boolean>{
    const user = await this.findOne(id)
    const deleted = await this.userRepository.delete(user)
    
    if(deleted){
      return true
    }
    return false

  }
}
