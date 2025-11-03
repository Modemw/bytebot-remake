import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomModelsService } from './custom-models.service';
import { CreateCustomModelDto } from './dto/create-custom-model.dto';
import { UpdateCustomModelDto } from './dto/update-custom-model.dto';

const requestValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidUnknownValues: true,
});

@Controller('custom-models')
export class CustomModelsController {
  constructor(private readonly customModelsService: CustomModelsService) {}

  @Get()
  async list() {
    return this.customModelsService.findAll();
  }

  @Post()
  @UsePipes(requestValidationPipe)
  async create(@Body() dto: CreateCustomModelDto) {
    return this.customModelsService.create(dto);
  }

  @Patch(':id')
  @UsePipes(requestValidationPipe)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCustomModelDto,
  ) {
    return this.customModelsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customModelsService.remove(id);
    return { success: true };
  }
}
