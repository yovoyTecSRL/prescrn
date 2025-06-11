export interface CustomRequest {
    userId: string;
    body: any;
}

export interface CustomResponse {
    status: number;
    message: string;
    data?: any;
}