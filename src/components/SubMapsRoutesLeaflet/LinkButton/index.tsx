import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import {FaMapLocationDot} from 'react-icons/fa6'

interface Props {
    link: string;
    id: string | number;
    nome: string | number;
}


export default function LinkButton({link, id, nome}: Props) {
    const [mostraLinkCopiado, setMostraLinkCopiado] = useState<string>(`Copiar Link ${nome}`)
    return(
        <div>
            <Button
                type="submit"
                className='w-full bg-primary text-center my-1 text-white'
                key={id}
                onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(link);
                    setMostraLinkCopiado(`LINK ${nome} COPIADO`)
                    setTimeout(() => {
                        setMostraLinkCopiado(`LINK ${nome}`)
                    }, 1000)
                }}
                >
                    {mostraLinkCopiado}


            </Button>

            <Button
                type="submit"
                className='w-full bg-primary text-center text-white'
                key={`googleMapsExternalLink${id}`}
                >
                <Link className='w-full  text-white p-2' target="_blank" href={link} style={{color: '#ffffff'}}>
                    Abrir no Google Maps
                </Link> 

            </Button>

        </div>
    )
}