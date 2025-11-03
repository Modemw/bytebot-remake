import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomModelDto } from './dto/create-custom-model.dto';
import { UpdateCustomModelDto } from './dto/update-custom-model.dto';
import { BytebotAgentModel } from '../agent/agent.types';
import { CustomModel, Prisma } from '@prisma/client';

function normalizeProvider(provider?: string): string {
  if (!provider) {
    return 'custom';
  }
  return provider.toLowerCase();
}

@Injectable()
export class CustomModelsService {
  constructor(private readonly prisma: PrismaService) {}

  private toAgentModel(model: CustomModel): BytebotAgentModel {
    return {
      provider: normalizeProvider(model.provider),
      name: model.name,
      title: model.title,
      contextWindow: model.contextWindow ?? undefined,
    };
  }

  async findAll(): Promise<CustomModel[]> {
    return this.prisma.customModel.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async listAgentModels(): Promise<BytebotAgentModel[]> {
    const models = await this.findAll();
    return models.map((model) => this.toAgentModel(model));
  }

  async create(dto: CreateCustomModelDto): Promise<CustomModel> {
    return this.prisma.customModel.create({
      data: {
        provider: normalizeProvider(dto.provider),
        name: dto.name,
        title: dto.title,
        contextWindow: dto.contextWindow,
      },
    });
  }

  async update(id: string, dto: UpdateCustomModelDto): Promise<CustomModel> {
    const data: Prisma.CustomModelUpdateInput = {};

    if (dto.provider !== undefined) {
      data.provider = normalizeProvider(dto.provider);
    }
    if (dto.name !== undefined) {
      data.name = dto.name;
    }
    if (dto.title !== undefined) {
      data.title = dto.title;
    }
    if (dto.contextWindow !== undefined) {
      data.contextWindow = dto.contextWindow;
    }

    try {
      return await this.prisma.customModel.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Custom model with id ${id} not found.`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.customModel.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Custom model with id ${id} not found.`);
    }
  }
}
