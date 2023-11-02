import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import Entities from "./database.entities";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const PostgresDatabaseInit = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: Entities,
    synchronize: true,
    autoLoadEntities: true
})