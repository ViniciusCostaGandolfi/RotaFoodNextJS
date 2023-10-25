import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

import {VscGraph} from 'react-icons/vsc'
import {FaRoute} from 'react-icons/fa'
import {BsFileBarGraph} from 'react-icons/bs'
import {MdFastfood, MdCategory} from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'
import {BiSolidFoodMenu, BiSolidReport} from 'react-icons/bi'
import {FaMotorcycle} from 'react-icons/fa6'
import {SiIfood} from 'react-icons/si'

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'DashBoard',
  },
  // label end
  {
    name: 'Análise de Pedidos',
    href: '/',
    // href: routes.file.dashboard,
    icon: <VscGraph />,
  },
  {
    name: 'Análise de Produtos',
    href: routes.logistics.dashboard,
    icon: <BsFileBarGraph />,
  },
  {
    name: 'Análise de Rotas',
    href: routes.eCommerce.dashboard,
    icon: <FaRoute />,
  },
  // label start
  {
    name: 'Meus Apps',
  },
  // label end
  {
    name: 'Pedidos',
    href: '#',
    icon: <BiSolidFoodMenu />,
    dropdownItems: [
      {
        name: 'Listar',
        href: routes.eCommerce.orders,
      },
      {
        name: 'Criar',
        href: routes.eCommerce.createOrder,
      }
    ],
  },
  {
    name: 'Rotas',
    href: '#',
    icon: <GrMapLocation />,
    dropdownItems: [
      {
        name: 'Mapa e Confihurações',
        href: routes.widgets.maps,
      },
      {
        name: 'Listar',
        href: routes.logistics.shipmentDetails(DUMMY_ID),
      },
    ],
  },
  {
    name: 'Categoria',
    href: '#',
    icon: <MdCategory />,
    dropdownItems: [
      {
        name: 'Listar',
        href: routes.eCommerce.products,
      },
      {
        name: 'Criar',
        href: routes.eCommerce.createProduct,
      }
    ],
  },
  {
    name: 'Produtos',
    href: '#',
    icon: <MdFastfood />,
    dropdownItems: [
      {
        name: 'Listar',
        href: routes.eCommerce.products,
      },
      {
        name: 'Criar',
        href: routes.eCommerce.createProduct,
      }
    ],
  },
  {
    name: 'Entregadores',
    href: '#',
    icon: <FaMotorcycle />,
    dropdownItems: [
      {
        name: 'List',
        href: routes.invoice.home,
      },
      {
        name: 'Create',
        href: routes.invoice.create,
      }
    ],
  },
  // label start
  {
    name: 'Integração com IFood',
  },
  // label end
  {
    name: 'Configurações',
    href: routes.widgets.cards,
    icon: <SiIfood />,
  },
  {
    name: 'Listar',
    href: routes.widgets.icons,
    icon: <BiSolidReport />,
  },
];
