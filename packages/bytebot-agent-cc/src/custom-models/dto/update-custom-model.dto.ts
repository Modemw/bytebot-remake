import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomModelDto } from './create-custom-model.dto';

export class UpdateCustomModelDto extends PartialType(CreateCustomModelDto) {}
