import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Carlos Menam',
      email: 'venamoth@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Juan Carlos Jiajied',
      email: 'jcjiajied@hotmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Susana Rocasalvo',
      email: 'niang@hotmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Flavio Pedemonti',
      email: 'flav10@hotmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'John Homelander',
      email: 'omelanda@protonmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException('User role not found');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) throw new NotFoundException('User not found');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHigestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHigestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return user;
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
