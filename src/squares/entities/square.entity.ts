import { Territory } from 'src/territories/entities/territory.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Square {

    @PrimaryColumn({name: 'START_X', type: 'int'})
    startX: number

    @PrimaryColumn({name: 'START_Y', type: 'int'})
    startY: number

    @ManyToOne(() => Territory, territory => territory.squares, {cascade:true, nullable: false})
    @JoinColumn({ name: "ID_TERRITORY" })
    territory: Territory
    
}
