const multer = require('multer');
const ErrorHandler = require('./errorHandler');

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, `${new Date().toISOString()}-${file.originalname.split('.')[0]}`);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new ErrorHandler('Not an image, please uplaod an image', 400), false);
	}
};

const upload = multer({
	storage: storage,
	// limits: { fileSize: 1024 * 1024 },
	fileFilter: multerFilter,
}).array('images', 3);

module.exports = upload;
