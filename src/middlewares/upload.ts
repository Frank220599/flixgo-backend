const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

// multer conf
const fileStorage = (folderName: string) => multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, folderName)
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, uniqid.time() + path.extname(file.originalname))
    }
});

const fileFilter = (fileTypes: Array<string>) => (req: any, file: any, cb: any) => {
        if (!fileTypes) {
            return  cb(null, true)
        }
        for (const fileType of fileTypes) {
            if (file.mimetype === fileType) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }
;

const upload = (folderName: string, fileTypes?: Array<string>) => ({
    storage: fileStorage(folderName),
    fileFilter: fileFilter(fileTypes)
});

export default upload;
