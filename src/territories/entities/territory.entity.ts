import { Square } from 'src/squares/entities/square.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CreateTerritoryDto } from '../dto/create-territory.dto'
import { UpdateTerritoryDto } from '../dto/update-territory.dto';

@Entity()
export class Territory {

    public createTerritoryDto(territoryDto: CreateTerritoryDto){
        this.name = territoryDto.name
        this.startX = territoryDto.start.x
        this.startY = territoryDto.start.y
        this.endX = territoryDto.end.x
        this.endY = territoryDto.end.y
    }

    public updateTerritoryDto(territoryDto: UpdateTerritoryDto){
        if(typeof territoryDto.name === 'string' && territoryDto.name.length > 0 ){
            this.name = territoryDto.name || this.name
        }
        this.startX = territoryDto.start?.x || this.startX
        this.startY = territoryDto.start?.y || this.startY
        this.endX = territoryDto.end?.x || this.endX
        this.endY = territoryDto.end?.y || this.endY
    }

    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: 'NAME', nullable: false, unique: false})
    name: string

    @Column({name: 'START_X', type: 'int'})
    startX: number

    @Column({name: 'START_Y', type: 'int'})
    startY: number

    @Column({name: 'END_X', type: 'int'})
    endX: number

    @Column({name: 'END_Y', type: 'int'})
    endY: number

    @OneToMany(() => Square, square => square.territory)
    squares: Square[];
    
}
