import logoRotaFood from '@public/images/logo_rotafood.png'
import iconeRotaFood from '@public/images/icone_rotafood.svg'
import Image from 'next/image';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
     <Image src={iconOnly? iconeRotaFood : logoRotaFood} alt={'Logo RotaFood'} />
  );
}
