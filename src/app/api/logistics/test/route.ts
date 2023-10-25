// import { httpServer } from '@/components/HttpServer';

// export async function POST(request: Request) {
//   try {
//     const req = await request.json();
//     console.log({ data: req })
//     const response = await httpServer.post('logistics/test/', req);

//     console.log(response.data); // Trate a resposta como necessário
//     return new Response(JSON.stringify(response.data), {
//       status: response.status,
//       headers: response.headers,
//     });
//   } catch (error) {
//     // console.error(error);
//     return new Response('Erro interno', { status: 500 });
//   }
// }
