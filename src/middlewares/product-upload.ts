import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import {
  PRODUCT_ALLOWED_FILE_TYPES,
  PRODUCT_MAX_FILE_COUNT,
  PRODUCT_MAX_FILE_SIZE,
  PRODUCT_UPLOAD_PATH,
} from '../config';
import { BadRequestError } from '../utils';

const ensureUploadDirectory = () => {
  if (!fs.existsSync(PRODUCT_UPLOAD_PATH)) {
    fs.mkdirSync(PRODUCT_UPLOAD_PATH, { recursive: true });
  }
};

const cleanupUploadedFile = (file: Express.Multer.File) => {
  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log('🗑️ Cleaned up file:', file.path);
    }
  } catch (error) {
    console.warn('⚠️ Failed to cleanup file:', file.path);
  }
};

const cleanupAllUploadedFiles = (req: Request) => {
  if (req.files) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files).flat();

    files.forEach(cleanupUploadedFile);
  }
};

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    ensureUploadDirectory();
    callback(null, PRODUCT_UPLOAD_PATH);
  },
  filename(_req, file, callback) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname).toLowerCase();
    const sanitizedName = file.fieldname.replace(/[^a-zA-Z0-9]/g, '');
    callback(null, `${sanitizedName}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (
  _req: Request,
  { mimetype }: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  const allowedTypes = PRODUCT_ALLOWED_FILE_TYPES.map(type =>
    type.toLowerCase(),
  );

  if (allowedTypes.includes(mimetype.toLowerCase())) {
    callback(null, true);
  } else {
    callback(
      new BadRequestError(
        `File type ${mimetype} is not allowed. Allowed types: ${allowedTypes.join(',')}`,
      ),
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: PRODUCT_MAX_FILE_SIZE * 1024 * 1024,
    files: PRODUCT_MAX_FILE_COUNT,
  },
  fileFilter,
});

const handleUploadError = (
  error: Error,
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (error instanceof multer.MulterError) {
    cleanupAllUploadedFiles(req);

    let errorMessage: string;

    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        errorMessage = `File to large. Maximum size is ${PRODUCT_MAX_FILE_SIZE}MB.`;
        break;
      case 'LIMIT_FILE_COUNT':
        errorMessage = `Too many files. Maximum ${PRODUCT_MAX_FILE_COUNT} file(s) allowed.`;
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        errorMessage = 'Unexpected file field.';
        break;
      default:
        errorMessage = 'Failed to upload error.';
    }

    next(new BadRequestError(errorMessage));
  } else {
    next(error);
  }
};

export const product = {
  upload,
  handleUploadError,
};
