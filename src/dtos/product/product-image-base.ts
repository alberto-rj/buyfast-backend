import * as z from 'zod';

import { setDefaultFalse, setUUID } from '..';

export const id = setUUID();

export const url = z.url({ error: 'url must be valid.' });

export const publicId = z.url({ error: 'publicId must be valid.' });

export const altText = z
  .string({
    error: 'altText must be a string.',
  })
  .min(4, { error: 'altText must have at least 4 characters.' })
  .max(125, { error: 'altText cannot exceed 125 characters.' });

export const order = z
  .int({ error: 'order must be an integer.' })
  .min(0, { error: 'order must be at least 0.' })
  .default(0);

export const isPrimary = setDefaultFalse({ fieldName: 'isPrimary' });
