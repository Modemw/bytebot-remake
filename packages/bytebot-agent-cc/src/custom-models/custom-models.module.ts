import { Module } from '@nestjs/common';
import { CustomModelsService } from './custom-models.service';
import { CustomModelsController } from './custom-models.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CustomModelsController],
  providers: [CustomModelsService],
  exports: [CustomModelsService],
})
export class CustomModelsModule {}
