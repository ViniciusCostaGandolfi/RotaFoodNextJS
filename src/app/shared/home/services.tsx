import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import dashboradPath from '@public/images/dashboard_icon.png'
import veicleRoutineIconPath from '@public/images/vaicle_icon.png'
import ifoodIcon from '@public/images/ifood_icon.png'



export default function HomeServices() {

  const services = [
    {
      id: 1,
      name: 'Dashboard',
      description: 'Dashboard interativo com todas as funcionalidades inclusas!',
      image: dashboradPath,
      
    },
    {
      id: 2,
      name: 'Roteirização',
      description: 'Roteirização 100% automatizada, considerando distancia, volume e atraso!',
      image: veicleRoutineIconPath,
      
    },
    {
      id: 3,
      name: 'Integração com IFood',
      description: 'Integração com IFood inclusa e sem limite de uso!',
      image: ifoodIcon,
      
    },
  ]

  return (
    

      <div>

        <div  className='pt-40'>
          <Title className='text:primary pb-5 text-5xl text-center'>
                Nossos Serviços
          </Title>

          <Text  className='text:primary pb-5 text-xl text-center'>
            Utilizamos as melhores tecnologias para facilitar seu trabalho!
            <br/>
            Tudo incluso em nosso plano! Teste com 3 meses de graça!
          </Text>
        </div>

        <div className='flex flex-col sm:flex-row justify-around'>
            {services.map( (service) => (
              <div className='w-11/12 sm:w-1/4 flex flex-col items-center' key={service.id}>
              <Image className='w-1/2' src={service.image} alt={service.name}/>
              <Title className='text-center'>{service.name}</Title>
              <Text className='text-center'>{service.description}</Text>
              
            </div>
            ) )}
         </div>

      </div>
  );
}
