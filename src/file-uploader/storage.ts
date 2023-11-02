import {diskStorage} from "multer";
import * as uuid from "uuid";

export enum FileType {
    IMAGE = './uploads/images'
}

export const storage = (destination: FileType) => {
    return {
        storage: diskStorage({
            destination: destination,
            filename: (req, file, callback) => {
                const filename = uuid.v4() + '.' + file.originalname.split('.').pop();
                callback(null, filename)
            }
         })
    }
}