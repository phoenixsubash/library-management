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
import { StockDto } from './dto';
import { StockService } from './stock.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateStock(
    @Param('id', ParseIntPipe) stockId: number,
    @Body() dto: StockDto,
  ) {
    return this.stockService.updateStock(stockId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getStock() {
    return this.stockService.getStock();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createStock(@Body() dto: StockDto) {
    console.log(dto);
    return this.stockService.createStock(dto);
  }
}
