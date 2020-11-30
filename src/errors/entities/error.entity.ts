import { ResponseDto } from "src/utils/dto/response.dto"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ErrorEntity {
    
    @PrimaryGeneratedColumn({name: "ID"})
    id: number
    
    @Column({name: "TIMESTAMP", type: "timestamp", default: new Date()})
    dateTime: Date

    @Column({name: "TYPE", type: "text", nullable: false})
    type: TypesStrings

    @Column({name: "DOMAIN", type: "text", nullable: false})
    domain: DomainsStrings
    
    @Column({name: "MESSAGE", type:"text"})
    message: string

    @Column({name: "DATA", type: "json", nullable: true})
    data: ResponseDto
}
