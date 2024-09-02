import { IsEnum, IsNotEmpty } from "class-validator";
import { unitType } from "src/enum";

export class GetUnitDto {

    @IsNotEmpty()
    @IsEnum(unitType)
    unitType: unitType;

    @IsNotEmpty()
    unitValue: number;
}


