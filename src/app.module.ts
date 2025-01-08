import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PostModule } from './posts/post.module';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
