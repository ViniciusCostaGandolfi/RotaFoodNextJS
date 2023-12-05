import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import cristianoPath from '@public/images/Cristiano.png'
import viniciusPath from '@public/images/Vinicius.jpeg'
import sauloPath from '@public/images/Saulo.png'
import {BsWhatsapp} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'



export default function HomeAboutUs() {

  const profiles = [
    {
      id: 1,
      name: 'Saulo Alves',
      description: 'Aluno de Doutorado em Matematica Aplicada - IMECC',
      image: sauloPath,
      links: [
        {
          link: 'https://wa.me/553391580848', 
          icon: BsWhatsapp, 
          title: 'WhatsApp'
        }, 
        {
          link: 'mailto:s211290@dac.unicamp.br',
          icon: MdEmail,
          title: 'Email'
        }
      ],
    },
    {
      id: 2,
      name: 'Vinicius Gandolfi',
      description: 'Aluno de Engenharia de Produção na FCA-Unicamp',
      image: viniciusPath,
      links: [
        
        {
          link: 'https://wa.me/5519981859845', 
          icon: BsWhatsapp, 
          title: 'WhatsApp'
        }, 
        {
          link: 'mailto:v245274@dac.unicamp.br',
          icon: MdEmail,
          title: 'Email'
        }
      ],
    },
    {
      id: 3,
      name: 'Cristiano Torrezan',
      description: 'Docente na FCA-UNICAMP.',
      image: cristianoPath,
      links: [
        {
          link: 'https://wa.me/5519982050641', 
          icon: BsWhatsapp, 
          title: 'WhatsApp'
        }, 
        {
          link: 'mailto:torezzan@unicamp.br',
          icon: MdEmail,
          title: 'Email'
        }
      ],
    },
  ]

  return (
    

      <div>

        <div  className='pt-40' id='contact'>
          <Title className='text:primary pb-5 text-5xl text-center'>
              Sobre Nós
          </Title>

          <Text  className='text:primary pb-5 text-xl text-center'>
            Somos um spin-off de base tecnológica gerada na Unicamp. 
            <br/>
            Utilizamos inteligência artificial e otimização matemática para gerar nossas soluções.
          </Text>
        </div>

        <div id='about_us' className='flex flex-col sm:flex-row items-center justify-around'>
            {profiles.map( (profile) => (
              <div className='w-11/12 sm:w-1/4' key={profile.id}>
              <Image className='rounded-2xl' src={profile.image} alt={profile.name}/>
              <Title className='text-center'>{profile.name}</Title>
              <Text className='text-center'>{profile.description}</Text>
              <div className='flex flex-row justify-around'>
                
              {profile.links.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  rel="norefferer"
                  target="_blank"
                  className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"
                >
                  <item.icon size={40}/>
                </a>
              ))}
              </div>
            </div>
            ) )}
         </div>

      </div>
  );
}
