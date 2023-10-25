import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { PiPlusBold } from 'react-icons/pi';
import PageHeader from '@/app/shared/page-header';
import CreateProduct from '@/app/shared/ecommerce/product/create';

const pageHeader = {
  title: 'Criar Produto',
  breadcrumb: [
    {
      href: routes.eCommerce.products,
      name: 'Produtos',
    },
    {
      name: 'Criar',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Adicionar Produto
          </Button>
        </Link>
      </PageHeader>

      <CreateProduct />
    </>
  );
}
