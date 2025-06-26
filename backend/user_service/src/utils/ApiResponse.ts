export class ApiResponse {
    private status: number
    private data: any
    private message: String

    constructor (status: 200, data: null, message: "success") {
        this.status = status,
        this.data = data,
        this.message = message
    }
}