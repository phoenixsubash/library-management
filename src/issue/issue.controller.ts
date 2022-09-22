import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/decorator/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/decorator/strategy';
import { RolesGuard } from 'src/auth/decorator/strategy/roles.guard';
import { IssueDto } from './dto';
import { IssueService } from './issue.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  //CREATE Issue
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createIssue(@Body() dto: IssueDto) {
    return this.issueService.createIssue(dto);
  }

  // PATCH Issue
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  editIssue(@Param('id', ParseIntPipe) issueId: number, @Body() dto: IssueDto) {
    return this.issueService.editIssue(issueId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getIssue() {
    return 'all issues';
  }
}
