import { Module } from '@nestjs/common';
import {EnvironmentInit} from "./environment/environment.init";
import Modules from "./modules";
import {PostgresDatabaseInit} from "./database/database.init";
import {StaticFilesInit} from "./file-uploader/static-files.init";

@Module({
  imports: [
      EnvironmentInit,
      PostgresDatabaseInit,
      StaticFilesInit,
      ...Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
