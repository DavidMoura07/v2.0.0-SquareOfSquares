export class ResponseDto {
    readonly count?: number
    readonly data?: any
    readonly error?: boolean

    constructor(data?: any, error?: boolean){
        if(Array.isArray(data)){
            this.count = data.length
        }
        if(data){
            this.data = data
        }
        if(typeof error === 'boolean'){
            this.error = error
        }
    }
}
