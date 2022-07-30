/**
 * 响应数据
 */
export interface IResponse {
    data: {
        code: number;
        data: any;
        msg?: string;
    };
    [key: string]: any;
};
