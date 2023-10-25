import { z } from 'zod';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    title: product?.title ?? '',
    categories: product?.categories ?? '',
    description: product?.description ?? '',
    price: product?.price ?? '',
    images: product?.images ,
  };
}

export const productFormSchema = z.object({
  title: z.string().min(1, { message: 'This field is required' }),
  categories: z.string().min(1, { message: 'This field is required' }),
  description: z.string().optional(),
  isActive: z.boolean().optional().default(true),

  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ).optional(),

  price: z
    .number()
    .min(0, { message: 'This field is required' })
    .or(z.string().min(1, { message: 'This field is required' })),
  shippingPrice: z
    .number()
    .min(0, { message: 'This field is required' })
    .or(z.string().min(1, { message: 'This field is required' })),
  locationShipping: z.array(
    z.object({
      name: z.string().optional(),
      shippingCharge: z.number().or(z.string()).optional(),
    })
  ),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'esfirras',
    name: 'Esfirras',
  },
  {
    value: 'pastel',
    name: 'Paster',
  },
  {
    value: 'hamburguer',
    name: 'Hamburguer',
  },
  {
    value: 'pizza',
    name: 'Pizza',
  }
];
