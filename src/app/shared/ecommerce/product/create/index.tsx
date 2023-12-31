'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Title, Text } from '@/components/ui/text';
import FormNav, {
  formParts,
} from '@/app/shared/ecommerce/product/create/form-nav';
import {
  defaultValues,
  productFormSchema,
  CreateProductInput,
} from '@/app/shared/ecommerce/product/create/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create/pricing-inventory';
import FormFooter from '@/components/form-footer';
// eslint-disable-next-line no-duplicate-imports
import ProductDescription from '@/app/shared/ecommerce/product/create/product-description';

const MAP_STEP_TO_COMPONENT = {
  [formParts.description]: ProductDescription,
  [formParts.pricing]: PricingInventory,
  [formParts.media]: ProductMedia,
};

interface IndexProps {
  id?: string;
  product?: CreateProductInput;
  className?: string;
}

export default function CreateProduct({ id, product, className }: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    defaultValues: defaultValues(product),
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text as="b">Product successfully {id ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('[&_label.block>span]:font-medium', className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
