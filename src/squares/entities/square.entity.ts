import { Territory } from 'src/territories/entities/territory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Square {

    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: 'START_X', type: 'int'})
    startX: number

    @Column({name: 'START_Y', type: 'int'})
    startY: number

    @ManyToOne(() => Territory, territory => territory.squares, {cascade:true})
    @JoinColumn({ name: "ID_TERRITORY" })
    territory: Territory
    
}
