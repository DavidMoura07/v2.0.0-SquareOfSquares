import { ResponseDto } from "src/utils/dto/response.dto"
import { Domain } from "./domain-erro.entity"
import { TypeError } from "./type-error.entity"

export class Error {
    id: number
    dateTime: Date
    type: TypeError
    domain: Domain
    message: string
    data: ResponseDto
}
