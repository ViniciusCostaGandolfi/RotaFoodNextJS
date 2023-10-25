import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

import {VscGraph} from 'react-icons/vsc'
import {FaRoute} from 'react-icons/fa'
import {BsFillHouseDoorFill, 
        BsFillTelephonePlusFill, 
        BsFillPeopleFill} from 'react-icons/bs'
import {MdContactMail} from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'
import {BiSolidLogInCircle} from 'react-icons/bi'
import {FaMotorcycle} from 'react-icons/fa6'
import {SiIfood} from 'react-icons/si'

// Note: do not add href in the label object, it is rendering as label
export const loggedOutMenuItems = [
  // label start
  {
    name: 'Início',
    href: routes.home.index,
    icon: <BsFillHouseDoorFill/>

  },
  // label end
  {
    name: 'Contato',
    href: routes.home.contact,
    // href: routes.file.dashboard,
    icon: <BsFillTelephonePlusFill />,
  },
  {
    name: 'Sobre Nós',
    href: routes.home.about_us,
    // href: routes.file.dashboard,
    icon: <BsFillPeopleFill />,
  },
  {
    name: 'Entrar no App',
    href: routes.home.login,
    icon: <BiSolidLogInCircle />,
  },
  {
    name: 'Criar Conta',
    href: routes.home.register,
    icon: <MdContactMail />,
  },
  // label start
  {
    name: 'Teste de Performance',
    href: routes.home.performance_test,
    icon: <FaRoute/>
  },
  
];
