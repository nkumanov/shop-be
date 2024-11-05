import { Module } from "@nestjs/common";
import { JwtSvc } from "./services/jwt.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    providers: [JwtSvc],
    exports: [JwtSvc]
})
export class SharedModule{}