import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Message, Task } from '@prisma/client';
import { AddTaskMessageDto } from './dto/add-task-message.dto';
import { MessagesService } from '../messages/messages.service';
import { BytebotAgentModel } from 'src/agent/agent.types';
import { CustomModelsService } from '../custom-models/custom-models.service';

const customModelsEnv = process.env.BYTEBOT_CUSTOM_MODELS;

function loadCustomModels(): BytebotAgentModel[] {
  if (!customModelsEnv) {
    return [];
  }

  try {
    const parsed = JSON.parse(customModelsEnv);
    if (!Array.isArray(parsed)) {
      console.warn('BYTEBOT_CUSTOM_MODELS must be a JSON array.');
      return [];
    }

    return parsed
      .filter((model) => typeof model === 'object' && model !== null)
      .map((model) => ({
        provider:
          typeof model.provider === 'string' && model.provider.length > 0
            ? model.provider
            : 'custom',
        name: model.name,
        title: model.title ?? model.name,
        contextWindow: model.contextWindow,
      }))
      .filter(
        (model) =>
          typeof model.name === 'string' &&
          model.name.length > 0 &&
          typeof model.title === 'string',
      );
  } catch (error) {
    console.warn('Failed to parse BYTEBOT_CUSTOM_MODELS:', error);
    return [];
  }
}

const customModelsFromEnv = loadCustomModels();

const defaultModels: BytebotAgentModel[] = [
  {
    provider: 'anthropic',
    name: 'claude-code',
    title: 'Claude Code',
    contextWindow: 200000,
  },
];

const customModelsEnv = process.env.BYTEBOT_CUSTOM_MODELS;

function loadCustomModels(): BytebotAgentModel[] {
  if (!customModelsEnv) {
    return [];
  }

  try {
    const parsed = JSON.parse(customModelsEnv);
    if (!Array.isArray(parsed)) {
      console.warn('BYTEBOT_CUSTOM_MODELS must be a JSON array.');
      return [];
    }

    return parsed
      .filter((model) => typeof model === 'object' && model !== null)
      .map((model) => ({
        provider: (model.provider as BytebotAgentModel['provider']) ?? 'custom',
        name: model.name,
        title: model.title ?? model.name,
        contextWindow: model.contextWindow,
      }))
      .filter((model) => typeof model.name === 'string' && model.name.length > 0 && typeof model.title === 'string');
  } catch (error) {
    console.warn('Failed to parse BYTEBOT_CUSTOM_MODELS:', error);
    return [];
  }
}

const customModels = loadCustomModels();

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly messagesService: MessagesService,
    private readonly customModelsService: CustomModelsService,
  ) {}

  private async getAllCustomModels(): Promise<BytebotAgentModel[]> {
    const persisted = await this.customModelsService.listAgentModels();
    const combined = [...persisted, ...customModelsFromEnv];

    const deduped = new Map<string, BytebotAgentModel>();
    for (const model of combined) {
      if (model.name && !deduped.has(model.name)) {
        deduped.set(model.name, model);
      }
    }

    return Array.from(deduped.values());
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('statuses') statuses?: string,
  ): Promise<{ tasks: Task[]; total: number; totalPages: number }> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    // Handle both single status and multiple statuses
    let statusFilter: string[] | undefined;
    if (statuses) {
      statusFilter = statuses.split(',');
    } else if (status) {
      statusFilter = [status];
    }

    return this.tasksService.findAll(pageNum, limitNum, statusFilter);
  }

  @Get('models')
  async getModels() {
    const customModels = await this.getAllCustomModels();
    return [...defaultModels, ...customModels];
    const baseModels: BytebotAgentModel[] = [
      {
        provider: 'anthropic',
        name: 'claude-code',
        title: 'Claude Code',
        contextWindow: 200000,
      },
    ];

    return [...baseModels, ...customModels];
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Get(':id/messages')
  async taskMessages(
    @Param('id') taskId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ): Promise<Message[]> {
    const options = {
      limit: limit ? parseInt(limit, 10) : undefined,
      page: page ? parseInt(page, 10) : undefined,
    };

    const messages = await this.messagesService.findAll(taskId, options);
    return messages;
  }

  @Post(':id/messages')
  @HttpCode(HttpStatus.CREATED)
  async addTaskMessage(
    @Param('id') taskId: string,
    @Body() guideTaskDto: AddTaskMessageDto,
  ): Promise<Task> {
    return this.tasksService.addTaskMessage(taskId, guideTaskDto);
  }

  @Get(':id/messages/raw')
  async taskRawMessages(
    @Param('id') taskId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ): Promise<Message[]> {
    const options = {
      limit: limit ? parseInt(limit, 10) : undefined,
      page: page ? parseInt(page, 10) : undefined,
    };

    return this.messagesService.findRawMessages(taskId, options);
  }

  @Get(':id/messages/processed')
  async taskProcessedMessages(
    @Param('id') taskId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    const options = {
      limit: limit ? parseInt(limit, 10) : undefined,
      page: page ? parseInt(page, 10) : undefined,
    };

    return this.messagesService.findProcessedMessages(taskId, options);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.tasksService.delete(id);
  }

  @Post(':id/takeover')
  @HttpCode(HttpStatus.OK)
  async takeOver(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.takeOver(taskId);
  }

  @Post(':id/resume')
  @HttpCode(HttpStatus.OK)
  async resume(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.resume(taskId);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancel(@Param('id') taskId: string): Promise<Task> {
    return this.tasksService.cancel(taskId);
  }
}
