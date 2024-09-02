import { Injectable } from '@nestjs/common';
import { GetUnitDto } from './dto/get-unit.dto';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class UnitService {

  constructor(@InjectRepository(Unit) private unitRepository: Repository<Unit>) {

  }
  async unitConversion(getUnitDto: GetUnitDto) {
    let resultUnitConversion = {};

    switch (getUnitDto.unitType) {
      case 'MTA':
        resultUnitConversion['MMSCFD'] = getUnitDto.unitValue * 52.697;
        resultUnitConversion['tonsForDay'] = getUnitDto.unitValue * 2739.73;
        resultUnitConversion['kgPerSec'] = getUnitDto.unitValue * 31.71;
        break;

      case 'MMSCFD':
        resultUnitConversion['MTA'] = getUnitDto.unitValue / 52.697;
        resultUnitConversion['tonsForDay'] = getUnitDto.unitValue * 51.99;
        resultUnitConversion['kgPerSec'] = getUnitDto.unitValue * 0.601742;
        break;

      case 'tonsForDay':
        resultUnitConversion['MMSCFD'] = getUnitDto.unitValue * 0.019234;
        resultUnitConversion['MTA'] = getUnitDto.unitValue / 2739.73;
        resultUnitConversion['kgPerSec'] = getUnitDto.unitValue * 0.011574;
        break;

      case 'kgPerSec':
        resultUnitConversion['MMSCFD'] = getUnitDto.unitValue * 1.661;
        resultUnitConversion['tonsForDay'] = getUnitDto.unitValue * 86.388;
        resultUnitConversion['MTA'] = getUnitDto.unitValue / 31.71;
        break;

      default:
        break;
    }

    return resultUnitConversion;

  }

  async pvtConversion(temperature: number, pressure: number) {
    let pvtUnit = await this.unitRepository.findOne({ where: { id: `${temperature}-${Math.ceil(pressure)}` } });
    if (!isEmpty(pvtUnit)) {
      pvtUnit['viscosityInCp'] = (Number(pvtUnit.viscosity) * 1000).toString();
      return pvtUnit;
    }
    return {};

  }

}
