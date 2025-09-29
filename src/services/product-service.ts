import {
  ConflictError,
  canIncludeInactive,
  NotFoundError,
  getProductFindManyArgs,
  BadRequestError,
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../utils';
import { prisma, PRODUCT_MAX_FILE_COUNT } from '../config';
import {
  ProductCreateInput,
  ProductFindInput,
  ProductFindManyInput,
  ProductGetImagesInput,
  ProductImageOutput,
  ProductRemoveInput,
  ProductUpdateInput,
  ProductUpdateIsActiveInput,
  ProductUploadImagesInput,
  ProductRemoveImageInput,
  ProductRemoveImagesInput,
  toProductImageOutput,
  toProductOutput,
  toProductPaginationOutput,
} from '../dtos';
import { categoryService } from '../services';

const findById = async ({
  id,
  includeInactive,
}: {
  id: string;
  includeInactive: boolean;
}) => {
  const foundProduct = await prisma.product.findUnique({
    where: { id, isActive: canIncludeInactive(includeInactive) },
  });

  if (!foundProduct) {
    throw new NotFoundError('Product not found.');
  }

  return foundProduct;
};

const find = async ({
  id,
  includeInactive,
  includeImages,
  includeCategory,
  includeInactiveCategory,
}: ProductFindInput) => {
  const foundProduct = await prisma.product.findUnique({
    where: {
      id,
      isActive: canIncludeInactive(includeInactive),
      category: {
        isActive: canIncludeInactive(includeInactiveCategory),
      },
    },
    include: {
      category: includeCategory,
      images: includeImages,
    },
  });

  if (!foundProduct) {
    throw new NotFoundError('Product not found.');
  }

  return toProductOutput(foundProduct);
};

const findMany = async ({
  includeInactive,
  limit,
  page,
  ...props
}: ProductFindManyInput) => {
  const [total, foundProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isActive: canIncludeInactive(includeInactive),
      },
    }),
    prisma.product.findMany(
      getProductFindManyArgs({
        includeInactive,
        limit,
        page,
        ...props,
      }) as { [x: string]: never },
    ),
  ]);

  return toProductPaginationOutput({
    total,
    limit,
    page,
    resources: foundProducts,
  });
};

const create = async ({
  name,
  description,
  price,
  quantity,
  sku,
  categoryId,
  includeCategory,
  includeInactiveCategory,
}: ProductCreateInput) => {
  const [, foundProduct] = await Promise.all([
    categoryService.find({
      id: categoryId,
      includeInactive: includeInactiveCategory,
    }),
    prisma.product.findUnique({
      where: { sku },
      select: { id: true },
    }),
  ]);

  if (foundProduct) {
    throw new ConflictError([
      { field: 'sku', message: 'sku is already registered.' },
    ]);
  }

  const createdProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      quantity,
      sku,
      categoryId,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(createdProduct);
};

const update = async ({
  id,
  name,
  price,
  description,
  quantity,
  sku,
  weight,
  dimensions,
  categoryId,
  includeInactive,
  includeCategory,
  includeInactiveCategory,
}: ProductUpdateInput) => {
  // check if the category exists
  await categoryService.find({
    id: categoryId,
    includeInactive: includeInactiveCategory,
  });

  // check if the product exists
  await findById({ id, includeInactive });

  // check if is already registered another product with the same sku provided
  const foundProduct = await prisma.product.findUnique({ where: { sku } });
  const skuAlreadyExists = foundProduct && foundProduct.id !== id;

  if (skuAlreadyExists) {
    throw new ConflictError([
      { field: 'sku', message: 'sku is already registered.' },
    ]);
  }

  const updatedProduct = await prisma.product.update({
    data: {
      name,
      description,
      price,
      quantity,
      weight,
      dimensions,
      sku,
      categoryId,
    },
    where: {
      id,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(updatedProduct);
};

const updateIsActive = async ({
  id,
  isActive,
  includeInactive,
  includeCategory,
}: ProductUpdateIsActiveInput) => {
  await findById({ id, includeInactive });

  const updatedProduct = await prisma.product.update({
    data: {
      isActive,
    },
    where: {
      id,
    },
    include: {
      category: includeCategory,
    },
  });

  return toProductOutput(updatedProduct);
};

const remove = async ({ id, includeInactive }: ProductRemoveInput) => {
  await findById({ id, includeInactive });

  await prisma.product.delete({ where: { id } });
};

const uploadImages = async ({
  id,
  images,
  files,
  includeInactive,
}: ProductUploadImagesInput): Promise<ProductImageOutput[]> => {
  await findById({ id, includeInactive });

  const currentImages = await prisma.productImage.count({
    where: { productId: id },
  });

  const totalImages = currentImages + files.length;
  const maxImages = PRODUCT_MAX_FILE_COUNT;

  if (totalImages > maxImages) {
    throw new BadRequestError(
      `Exceed limit. Maximum ${maxImages} images by product. Current: ${currentImages}`,
    );
  }

  if (images.length !== files.length) {
    throw new BadRequestError(
      `files and images count do not match. files: ${files.length}, images: ${images.length}.`,
    );
  }

  const uploadPromises = files.map(async (file, index) => {
    const { url, publicId } = await uploadToCloudinary(
      file.path,
      `products/${id}`,
    );

    const { isPrimary, order, altText } = images[index];

    const productImage = await prisma.productImage.create({
      data: {
        url: url,
        publicId,
        isPrimary,
        order,
        altText,
        productId: id,
      },
    });

    return productImage;
  });

  const results = await Promise.all(uploadPromises);

  return results.map(toProductImageOutput);
};

const getImages = async ({
  id,
  includeInactive,
}: ProductGetImagesInput): Promise<ProductImageOutput[]> => {
  await findById({ id, includeInactive });

  const images = await prisma.productImage.findMany({
    where: {
      productId: id,
    },
    orderBy: { createdAt: 'desc' },
  });

  return images.map(toProductImageOutput);
};

const removeImages = async ({
  id,
  includeInactive,
}: ProductRemoveImagesInput): Promise<void> => {
  await findById({ id, includeInactive });

  const images = await prisma.productImage.findMany({
    where: {
      productId: id,
    },
    select: {
      publicId: true,
      id: true,
    },
  });

  if (images.length === 0) {
    return;
  }

  const cloudinaryDeletePromises = images.map(async image => {
    await deleteFromCloudinary(image.publicId as string);
  });

  await Promise.allSettled(cloudinaryDeletePromises);

  await prisma.productImage.deleteMany({
    where: {
      productId: id,
    },
  });
};

const removeImage = async ({
  id,
  includeInactive,
  imageId,
}: ProductRemoveImageInput): Promise<void> => {
  await findById({ id, includeInactive });

  const image = await prisma.productImage.findFirst({
    where: {
      id: imageId,
      productId: id,
    },
    select: {
      publicId: true,
    },
  });

  if (!image) {
    throw new NotFoundError('Image not found');
  }

  await deleteFromCloudinary(image.publicId as string);

  await prisma.productImage.delete({
    where: { id: imageId },
  });
};

export const productService = {
  find,
  findMany,
  create,
  remove,
  update,
  updateIsActive,
  uploadImages,
  getImages,
  removeImages,
  removeImage,
};
