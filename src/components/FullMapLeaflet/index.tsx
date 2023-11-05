/* eslint-disable no-duplicate-imports */
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, Popup } from "react-leaflet";
import { LatLngLiteral, LatLngExpression, icon } from "leaflet";
import Control from 'react-leaflet-custom-control'
import "leaflet/dist/leaflet.css";
import createColormap from "colormap";
import { useEffect, useRef, useState } from "react";
import { IRoute } from "@/interfaces/IRoute";
import {Text} from "@/components/ui/text"
import { FullscreenControl } from "react-leaflet-fullscreen";
import Select, { SelectOption } from "../ui/select";
import "react-leaflet-fullscreen/styles.css";
import LinkButton from "../SubMapsRoutesLeaflet/LinkButton";
import { Button } from "rizzui";





interface Props {
  routes: IRoute[];
}

interface IRouteSelect extends SelectOption {
  routes: IRoute[];
  name: string;
  value: string;
}

function FullMapLeaflet({ routes }: Props) {
    
    
  const iconEntrega = icon({
    iconUrl: "/images/icones/IconeEntrega.png",
    iconSize: [20, 20],
  });
  
  
  const iconBase2 = icon({
    iconUrl: "/images/icones/IconeRestaurante.png",
    iconSize: [40, 40],
  });

  const centro: LatLngLiteral = {
    lat: routes[0].points[0][0],
    lng: routes[0].points[0][1],
  };
  
  const colormap = createColormap<"hex">({
    alpha: 1,
    colormap: "rainbow",
    nshades: routes.length > 9 ? routes.length : 9,
    format: "hex",
  });
  
  const [optionsRoute, setOptionsRoute] = useState<IRouteSelect[]>([
    {
      name: 'Todas as Rotas',
      value: 'allRoutes',
      routes: routes
    }
  ]);

  useEffect(() => {
    setOptionsRoute([
      {
        name: 'Todas as Rotas',
        value: 'allRoutes',
        routes: routes
      }
    ])
    routes.map((route, index) => {
      setOptionsRoute((prevState) => [...prevState, {name: `Route ${index} - ${route.volume} litros`, value: `route${index}`,routes: [route]}])
    })
  }, [routes])

  const [selectedRoute, setSelectedRoute] = useState<IRouteSelect>(optionsRoute[0]);


  const popupRefs = useRef([]);


  
  return (
    <div className="w-full h-full pt-5" >

      <Text className="text-primary text-3xl font-bold">Mapa Completo</Text>
      <Text className="text-dark text-lg pb-6">Clique nas linhas, pontos ou botẽes para ver mais informações</Text>
      {/* <Select
        options={optionsRoute}
        value={selectedRoute}
        onChange={(value: string) => {
          const possibleRoute = optionsRoute.find((route) => route.value === value);
          if (possibleRoute !== undefined) {
            setSelectedRoute(possibleRoute)
          }
        }}
        label="Selecione uma Rota"
        getOptionValue={(option) => option.value}
      /> */}

    <MapContainer 
      className="z-0 relative" 
      center={centro} zoom={14} 
      style={{ width: "100%", height: "70vh" }} 
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      
      {selectedRoute.routes.map((route, routeIndex) => {
        const posicoes: LatLngExpression[] = route.points.map((point) => [point[0], point[1]]);
        const sequence = route.sequence;

        return (
          <div key={`route_div-${routeIndex}`}>
            {route.orders?.map((order, markerIndex) => {
              if (markerIndex !== posicoes.length && markerIndex !== 0) return (
                  <Marker
                    position={order.locale}
                    key={`route_marker${markerIndex}-${routeIndex}`}
                    icon={iconEntrega}
                    
                  >
                    <Popup>
                      id: {order.id} <br/>
                      volume: {order.volume} <br/>
                      latitude: {order.locale[0]},  <br/>
                      longitude: {order.locale[1]},  <br/>
                    </Popup>
                  </Marker>
              )
            })}
            <Polyline  
              key={`route_polyline${routeIndex}`} 
              positions={sequence.map((i) => posicoes[i])} 
              pathOptions={{ color: colormap[routeIndex], weight: 5 }} 
              //@ts-ignore
              ref={ref => popupRefs[routeIndex] = ref }
              
              
              >
                <Popup >
                  nome: {route.name} <br/>
                  Volume: {route.volume} <br/>
                  Distancia Linear: {route.distance.toFixed(2)} km<br/>
                  <LinkButton link={route.link_google_maps} id={routeIndex} nome={routeIndex} />
                  
                </Popup>

              </Polyline>
          </div>
        );
      })}
       <Marker position={centro} key={`markerLeaflet-Base`} icon={iconBase2} >

          <Popup>
            Olá Restaurante <br/>
            Voce tem tem muitos pedidos <br/>
            Usando o RotaFood vai dar tudo certo ;-;
          </Popup>
       </Marker>
       
        <Control position='bottomright'>
          <div className="w-36 rounded-2xl overflow-scroll scroll-smooth max-h-44 sm:max-h-52	absolute bg-white/[0.9] bottom-0 right-0" style={{zIndex: 9999}}>
            <div>
                {
                  selectedRoute.routes.map((routee, indexx) => {
                    // const color = colormap[indexx]
                    return (
                      <Button className={` my-2 bg-primary`} key={`AiQDilica${indexx}`} style={{zIndex: 999999}} onClick={()=> {
                        //@ts-ignore
                        const poupOpen = popupRefs[indexx]    
                        if (poupOpen !== null) {
                          console.log(colormap[indexx])
                          poupOpen.openPopup();
                        }
                      }}>
                        <strong> Rota {}  </strong>
                        <div className={`w-6 h-6 bg-white rounded-full m-2 flex items-center justify-center`}>
                          <div className="w-3 h-3" style={{backgroundColor: colormap[indexx]}}>
                          </div>
                        </div>

                      </Button>
                    )
                  })
                }
            </div>
          </div>
        </Control>      
       <FullscreenControl position="topright" />
    </MapContainer>
    </div>

  );
}

export default FullMapLeaflet;
