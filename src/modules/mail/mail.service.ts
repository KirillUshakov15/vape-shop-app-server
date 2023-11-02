import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {ApiError} from "../../api-error/api-error";
import {PartnershipRequestDto} from "../auth/dto/partnership-request.dto";

@Injectable()
export class MailService{
    constructor(private readonly mailerService: MailerService) {}

    public async sendPassword(email: string, password: string): Promise<void> {
        try{
            await this.mailerService.sendMail({
                to: email,
                from: process.env.SMTP_HOST_MAIL,
                subject: 'Данные для входа в систему администрирования',
                template: './send-password-template',
                context: {
                    password: password,
                },
            })
        }
       catch (e) {
            /*if(e?.responseCode === 550){
                throw ApiError.BadRequest(`Ошибка при отправке письма на адрес. Данный почтовый адрес не существует`);
            }*/
           throw  ApiError.Internal('Ошибка при отправке письма')
       }
    }

    public async sendPartnershipMail(dto: PartnershipRequestDto){
        try{
            const {email, name, phoneNumber} = dto
            await this.mailerService.sendMail({
                to: process.env.SMTP_HOST_MAIL,
                from: process.env.SMTP_HOST_MAIL,
                subject: 'Заявка на сотрудничество',
                template: './send-partner-req-template',
                context: {
                    email: email,
                    name: name,
                    phoneNumber: phoneNumber
                },
            })
        }
        catch (e) {
            console.log(e)
            throw  ApiError.Internal('Ошибка при отправке письма')
        }
    }
}