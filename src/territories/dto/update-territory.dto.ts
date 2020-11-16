import { PartialType } from '@nestjs/mapped-types';
import { CreateTerritoryDto } from './create-territory.dto';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateTerritoryDto extends PartialType(CreateTerritoryDto) {
}
