import {Module} from "@nestjs/common";
import {MailerModule} from "@nestjs-modules/mailer";
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import {MailService} from "./mail.service";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.mail.ru",
                secure: false,
                auth: {
                    user: process.env.SMTP_HOST_MAIL,
                    pass: process.env.SMTP_HOST_MAIL_PASSWORD //"Oi2O2aKppiB}"
                }
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new EjsAdapter(),
                options: {
                    strict: false,
                },
            },
        })
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}