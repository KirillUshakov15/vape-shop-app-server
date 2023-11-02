import {ConfigModule} from "@nestjs/config";
import typeormConfig from "../config/typeorm.config";

export const EnvironmentInit = ConfigModule.forRoot({
    envFilePath: `.env`,
    isGlobal: true,
    load: [typeormConfig]
})