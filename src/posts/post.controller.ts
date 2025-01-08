import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateRequestDto } from './dtos/request/create-request.dto';
import { UpdateRequestDto } from './dtos/request/update-request.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto) {
    return this.postService.create(createRequestDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRequestDto: UpdateRequestDto) {
    return this.postService.update(id, updateRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
