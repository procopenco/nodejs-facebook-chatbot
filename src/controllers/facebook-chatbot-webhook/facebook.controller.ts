
import { Controller, Get,QueryParams, PathParams, Required, Req, Response, Request, Next } from 'ts-express-decorators';
import * as Express from "express";

// import { Returns } from 'ts-express-decorators/lib/swagger';

@Controller('/facebook')
export class FacebookController{
    @Get('/test')
    // @Returns(string)
    test(@QueryParams('id') id:string,
    @Response() response: Express.Response,
    @Next() next: Express.NextFunction): void {
        
        response.send('hello world from facebook controller ' + id);
    }    

    @Get('/webhook')
    // @Returns(string)
    async getUser(): Promise<string> {
        return 'hello';
    }    
}