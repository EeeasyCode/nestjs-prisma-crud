import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestDto } from './dtos/request/create-request.dto';
import { UpdateRequestDto } from './dtos/request/update-request.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async create(createRequestDto: CreateRequestDto) {
    return this.prismaService.post.create({
      data: {
        title: createRequestDto.title,
        content: createRequestDto.content,
        authorId: createRequestDto.authorId,
      },
    });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    return this.prismaService.post.update({
      where: { id },
      data: {
        title: updateRequestDto.title,
        content: updateRequestDto.content,
        authorId: updateRequestDto.authorId,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
