import { Button } from '@/components/ui/button';
import { useState } from 'react';


interface Props {
    link: string;
    id: string | number;
    nome: string | number;
}


export default function LinkButton({link, id, nome}: Props) {
    const [mostraLinkCopiado, setMostraLinkCopiado] = useState<string>(`LINK ${nome}`)
    return(
        <Button
        type="submit"
        className='w-full bg-primary text-center text-white'
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
    )
}