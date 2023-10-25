'use client'
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import {Button} from "@/components/ui/button"
import { z } from 'zod';
import { IRoute } from '@/interfaces/IRoute';
import http from '@/components/HTTP';
import {BiSolidTimer} from 'react-icons/bi';
import {Text, Title} from '@/components/ui/text';
import {FaMapMarkedAlt} from 'react-icons/fa'

interface Props {
    setRoutes: Dispatch<SetStateAction<IRoute[]>>;
    setShowMap: Dispatch<SetStateAction<boolean>>;


}

export default function GetRoutesForms({setRoutes, setShowMap}: Props) {


    const [isLoading, setIsLoading] = useState(false);
    const [loaddingTime, setLoaddingTime] = useState(0.0);
    const GetRoutesFormSchema = z.object({
        numberOfOrders: z
        .number().int().positive().max(500, { message: 'O máximo de pedidos para teste é 500' }),
        // categories: z.string().min(1, { message: 'Escolha o tipo de pedidos' }),
      });


    type CreateGetRoutesInput = z.infer<typeof GetRoutesFormSchema>;
    
    const { register, handleSubmit, 
        control, getValues, formState: { errors } } = useForm<CreateGetRoutesInput>({
        defaultValues: {
            numberOfOrders: 30,
            // categories: 'Hamberguers'
        },
        resolver: zodResolver(GetRoutesFormSchema),
      });
    


    const categories = [
        {
            name: 'Hamburgueres',
            value: 'hamburguer',
        },
        {
            name: 'Pizzas',
            value: 'pizza',
        },
        {
            name: 'Esfirras e Pastéis',
            value: 'esfirras_and_pastries',
        }
    ]

    function onSubmit(input: CreateGetRoutesInput) {
        setShowMap(false);
        const startTime = new Date();
        http
          .post('logistics/test/', { number_of_points: input.numberOfOrders })
          .then((response) => {
            const data: IRoute[] = response.data['routes'];
            setRoutes(data);
            setIsLoading(false);
            setShowMap(true);
      
            const endTime = new Date();
            //@ts-ignore
            const tempoDecorrido = endTime - startTime;
            setLoaddingTime(Number(tempoDecorrido))
          })
          .catch((errors) => {
            setIsLoading(false);
            console.log(errors);
          });
      }

    return (

        <div className="@container">
            <div className='text-primary-lighter'>

            </div>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className='p-0 sm:p-5 '
                > 
                <div className="grid grid-cols-1 sm:grid-cols-2 ">
                <Input
                    label="Numero de Pedidos"
                    size='xl'  
                    type='number'
                    {...register('numberOfOrders', {
                        setValueAs: (value) => Number(value),
                      })}
                    error={errors.numberOfOrders?.message as string}
                />
                {loaddingTime !== 0.0 && 
                <div className='text-xl text-primary'>
                    <Title className='text-primary'>Resultado</Title>
                    <div className='flex'>
                        <BiSolidTimer size={70} className='w-1/3'/>
                        <Text className='text-center'>
                            Gerencia {getValues('numberOfOrders')} pedidos dividindo em rotas para seus entregadores
                            considerando o volume dos pedidos, distancia e atraso em menos de {loaddingTime/1000} segundos
                        </Text>
                        
                    </div>
                    
                </div>
                }

            {loaddingTime === 0.0 && 
                <div className='text-xl text-primary'>
                    <Title className='text-primary'>Clique em gerar rotas para ver o resultado</Title>
                </div>
            }



                    {/* <Controller
                        name="categories"
                        control={control}
                        defaultValue={'Hamburgueres'}
                        render={({ field: { value, onChange } }) => (
                        <Select
                            options={categories}
                            key={value}
                            value={value}
                            size='xl'
                            label="Categorias"
                            onChange={onChange}
                            error={errors?.categories?.message as string}
                            getOptionValue={(option) => option.name}
                        />
                        )}
                    /> */}

                </div>

                <Button className='p-5 mt-5 text-xl' color="primary"  isLoading={isLoading}  type="submit">
                    Gerar Rotas
                </Button>


                </form>
        </div>
    )
}