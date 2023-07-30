import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengesService.create(createChallengeDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    await this.challengesService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.challengesService.remove(id);
  }

  @Patch('/close/:id')
  async updateClosed(@Param('id') id: string, @Body('isClosed') isClosed: boolean) {
    await this.challengesService.updateClosed(id, isClosed);
  }

  @Patch('/private/:id')
  async updatePrivate(@Param('id') id: string, @Body('isPrivate') isPrivate: boolean) {
    await this.challengesService.updatePrivate(id, isPrivate)
  }

  @Patch('/join/:id')
  async joinChallenge(@Param('id') id: string, @Body('user') user: string) {
    await this.challengesService.joinChallenge(id, user)
  }

  @Patch('/unjoin/:id')
  async unJoinChallenge(@Param('id') id: string, @Body('user') user: string) {
    await this.challengesService.unJoinChallenge(id, user);
  }
}
