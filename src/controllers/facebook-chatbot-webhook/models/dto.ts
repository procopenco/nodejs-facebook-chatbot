
import { Controller, Get, PathParams, Required, Req } from 'ts-express-decorators';
// import { Returns } from 'ts-express-decorators/lib/swagger';

@Controller('/facebook')
export class FacebookController{
    @Get('/test')
    // @Returns(string)
    async test(): Promise<string> {
        return 'hello world from facebook controller';
    }    

    @Get('/webhook')
    // @Returns(string)
    async getUser(): Promise<string> {
        return 'hello';
    }    
}