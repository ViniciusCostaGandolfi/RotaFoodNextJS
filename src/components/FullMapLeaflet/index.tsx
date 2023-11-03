/* eslint-disable no-duplicate-imports */
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, Popup } from "react-leaflet";
import { LatLngLiteral, LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import createColormap from "colormap";
import { useEffect, useState } from "react";
import { IRoute } from "@/interfaces/IRoute";
import {Text} from "@/components/ui/text"
import { FullscreenControl } from "react-leaflet-fullscreen";
import Select, { SelectOption } from "../ui/select";
import "react-leaflet-fullscreen/styles.css";





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


  
  return (
    <div className="w-full h-full pt-5" >

      <Text className="text-primary text-xl">Mapa Completo</Text>
      <Text className="text-dark text-lg pb-6">Clique em alguma linha ou ponto para ver mais informações</Text>
      <Select
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
      />

    <MapContainer className="z-0 relative" center={centro} zoom={14} style={{ width: "100%", height: "60vh" }} keyboard={false}>
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
                      locale: {order.locale} <br/>
                    </Popup>
                  </Marker>
              )
            })}
            <Polyline  
              key={`route_polyline${routeIndex}`} 
              positions={sequence.map((i) => posicoes[i])} 
              pathOptions={{ color: colormap[routeIndex], weight: 5 }} 
              
              
              >
                <Popup>
                  nome: {route.name} <br/>
                  Volume: {route.volume} <br/>
                  Distancia Linear: {route.distance} <br/>
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

       {/* <div className="w-52 h-52	absolute bg-white" style={{zIndex: 1000}}>
        <div>
            Clique em alguma rota e veja alguns dados sobre elas
            Clique 
        </div>
      </div> */}
       <FullscreenControl position="topright" />
    </MapContainer>
    </div>

  );
}

export default FullMapLeaflet;
