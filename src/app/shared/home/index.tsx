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
import HomeHero from './hero';
import HomeAboutUs from './about-us';
import HomeServices from './services';
import Link from 'next/link';
import http from '@/components/HTTP';



export default function HomeSection() {


  return (
    <div>
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
          <div>
            <Title
              as="h2"
              className="mb-3 text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
            >
              Bem Vindo ao RotaFood! <br />
              Seu Gerenciador de Rotas <br/>
              para Entrega de Comida
            </Title>
            <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              Economize tempo, não perca a qualidade so 
              seu produto com entregas demoradas
              fedelize seus clientes!
            </Text>
            <div className="mt-8 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start xl:gap-6">
              <Link href='/login'>
                <Button
                  
                  color="primary"
                  size="lg"
                  className="h-12 px-4 xl:h-14 xl:px-6"
                >
                    Crie sua conta
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={LaptopImg}
              alt="coming-soon"
              className="aspect-[632/630] max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
            />
            <Image
              src={MobileImg}
              alt="coming-soon"
              className="absolute left-0 top-1/2 z-10 aspect-[275/390] max-w-[100px] -translate-y-1/2 lg:max-w-[210px]"
            />
            <div className="mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)]"></div>
            <div className="absolute bottom-10 left-3 mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)] lg:left-7"></div>
          </div>
        </div>
      </div>

      

      <div>


        <HomeHero/>
        <HomeServices/>
        <HomeAboutUs/>
     

      </div>
    </div>
  );
}
