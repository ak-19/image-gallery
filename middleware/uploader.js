import multer from "multer";

const upload = multer({ dest: 'images/' }).single('selectedFile')

const uploader = async (req, res, next) => {
    try {
        upload(req, res, () => next());
    } catch (error) {
        console.log(error);
    }
};

export default uploader;