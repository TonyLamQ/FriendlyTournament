import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean {
        
        const host = context.switchToHttp(),
            request = host.getRequest();

        const user = request.headers['authorization'];
        if(!user){
            console.log('User not authenticated, denying access.')
            throw new UnauthorizedException();
        }

        console.log('User is authenticated, allowing access');
        return true;
    }
}