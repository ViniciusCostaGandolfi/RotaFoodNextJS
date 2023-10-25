import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import LaptopImg from '@public/images/desktop.png';
import MobileImg from '@public/welcome-mobile.png';
import VeicleRoutine from "@public/images/veicle_routine.png"
import cristianoPath from '@public/images/Cristiano.png'
import viniciusPath from '@public/images/Vinicius.jpeg'
import sauloPath from '@public/images/Saulo.png'
import {BsWhatsapp} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import HomeSection from '../shared/home';



export default function WelcomePage() {

  return (
    <div>
      <HomeSection/>
    </div>
  )

}
