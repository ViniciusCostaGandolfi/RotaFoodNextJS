'use client'
import {useState } from "react";
import { IRoute } from '@/interfaces/IRoute';
import {FaWeightScale, FaWeightHanging, FaLocationDot} from 'react-icons/fa6';
import {BiSolidTimeFive} from 'react-icons/bi';
import dynamic from 'next/dynamic';
import GetRoutesForms from "./FormPerformanceTest";
import SubMapsRoutesLeaflet from "@/components/SubMapsRoutesLeaflet";
import {Text, Title} from '@/components/ui/text'

const MapLeaflet = dynamic(() => import('@/components/FullMapLeaflet'), {
  ssr: false,
});

const array = [
  {
    id: 0,
    description: 'Uma endereço ao redor de Campinas-SP contendo sua latitude e longitude',
    icon: FaLocationDot
  },
  {
    id: 1,
    description: 'Um volume que será a soma dos volumes dos items de cada pedido',
    icon: FaWeightHanging
  },
  // {
  //   id: 2,
  //   description: 'Um atraso que será o tempo entre o pedido se feito e sair para entrega',
  //   icon: BiSolidTimeFive
  // },
  {
    id: 3,
    description: 'O volume dos pedidos de uma rota deve estar dentro da capacidade do entregador',
    icon: FaWeightScale
  }
]


export default function PerformanceTesteSection() {
  const [routes, setRoutes] = useState<IRoute[]>([])
  const [showMap, setShowMap] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center py-15 w-11/12" >

      <Title className="text-primary text-5xl pb-8">
        Teste de Performance
      </Title>

      <div className="grid grid-cols-1 w-11/12">
        {array.map(item => (
          <div className="flex flex-row items-start pb-4" key={item.id}>
            <item.icon className="text-primary w-1/4 sm:w-auto" size={40}/>
            <Text  className="text-primary text-xl sm:text-3xl ">{item.description}</Text>
          </div>
        ))}
      </div>
          <GetRoutesForms setRoutes={setRoutes} setShowMap={setShowMap} />
          {showMap && routes[0] &&
            
            <div>
              
              <MapLeaflet routes={routes} />

            </div>
            
          }


          {showMap && routes[0] &&
                      
            <div className="w-full items-center flex flex-col">
              <div className="sm:w-10/12 w-full items-center flex">
              
                <SubMapsRoutesLeaflet routes={routes} />

              </div>
            </div>
            
          }

      </div>
    </div>
  )
}
