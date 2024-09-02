import { PartialType } from '@nestjs/mapped-types';
import { GetUnitDto } from './get-unit.dto';

export class UpdateUnitDto extends PartialType(GetUnitDto) { }
