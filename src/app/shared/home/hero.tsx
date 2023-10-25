import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Title, Text } from '@/components/ui/text';
import VeicleRoutine from "@public/images/veicle_routine.png"

export default function HomeHero() {
    return (
        <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 w-full'>
          <div className='flex flex-col items-center '>
            <Image className='w-10/12 rounded-2xl' src={VeicleRoutine} alt={'Imagem Roteirização'} />
          </div>
            <div className='w-11/12'>
                <Title className='text-4xl text-primary'>O que é Roterização?</Title>
                <Text className='text-2xl'>
                  Em seu horário de pico, ou em uma promoção chegam muitos pedidos ao mesmo tempo, e sem uma Routerização adequada, é perdido muito tempo entre o pedido ficar pronto e sair, além de demorar mais para entrega dos pedidos. 
                  <br/>
                  Nós da RotaFood desenvolvemos um algoritmo inovador que faz toda essa roteirização em poucos segundos, diminuindo o tempo de entrega considerando a capacidade do entregador.
                </Text>

                <Button
                  size="xl"
                  variant="outline"
                  className="h-12 px-4 xl:h-14 xl:px-6 text-2xl"
                >
                  Saiba Mais
                </Button>
            </div>
        </div>

      </div>
    )
}