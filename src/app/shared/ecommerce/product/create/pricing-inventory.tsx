import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import ProductDisponibily from '@/app/shared/ecommerce/product/create/product-availability';
import ProductPricing from '@/app/shared/ecommerce/product/create/product-pricing';

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="Preço e Disponibilidade"
        description="Adicione o preço do produto"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      <FormGroup
        title="Disponibilidade"
        description="Selecione se o produto esta disponível"
        className={cn(className)}
      >
        <ProductDisponibily />
      </FormGroup>
    </>
  );
}
