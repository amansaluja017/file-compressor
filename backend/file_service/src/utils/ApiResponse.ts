export class ApiResponse {
    private status: number
    private data: any
    private message: String

    constructor (status: number, data: any = "", message: string) {
        this.status = status,
        this.data = data,
        this.message = message
    }
}