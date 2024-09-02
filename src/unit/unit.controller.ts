import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UnitService } from './unit.service';
import { GetUnitDto } from './dto/get-unit.dto';


@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @Post('conversion')
  getUnitConversion(@Body() getUnitDto: GetUnitDto) {
    return this.unitService.unitConversion(getUnitDto);
  }

  @Get('pvt')
  getPvtConversion(@Query('temperature') temperature: number, @Query('pressure') pressure: number) {
    const res = this.unitService.pvtConversion(temperature, pressure);

  }

}
