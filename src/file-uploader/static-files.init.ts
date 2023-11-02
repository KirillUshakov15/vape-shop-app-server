import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

export const StaticFilesInit = ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '../..', 'uploads'),
})
