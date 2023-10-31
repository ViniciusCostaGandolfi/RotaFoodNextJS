/* eslint-disable no-duplicate-imports */
import { MapContainer, TileLayer, Marker, Polyline, LayersControl, Popup } from "react-leaflet";
import { LatLngLiteral, LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import createColormap from "colormap";
import { ChangeEvent, useEffect, useState } from "react";
import { IRoute } from "@/interfaces/IRoute";
import {Text} from "@/components/ui/text"
import { FullscreenControl } from "react-leaflet-fullscreen";
import Select, { SelectOption } from "../ui/select";




interface Props {
  routes: IRoute[];
}

interface IRouteSelect extends SelectOption {
  routes: IRoute[];
  name: string;
  value: string;
}

function FullMapLeaflet({ routes }: Props) {
  // const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    // const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    
    



  const iconEntrega = icon({
    iconUrl: "/images/locality_icon.png",
    iconSize: [15, 20],
  });
  
  
  const iconBase2 = icon({
    iconUrl: "/images/house_icon2.png", 
    iconSize: [35, 35],
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
      setOptionsRoute((prevState) => [...prevState, {name: `Route ${index}`, value: `route${index}`,routes: [route]}])
    })
  }, [routes])

  const [selectedRoute, setSelectedRoute] = useState<IRouteSelect>(optionsRoute[0]);

  
  return (
    <div className="w-full h-full pt-5" >

      <Text className="text-primary text-xl">Mapa Completo</Text>
      <Select
        options={optionsRoute}
        value={selectedRoute}
        onChange={(value: string) => {
          const possibleRoute = optionsRoute.find((route) => route.value === value);
          if (possibleRoute !== undefined) {
            setSelectedRoute(possibleRoute)
          }
        }}
        label="Rotas"
        getOptionValue={(option) => option.value}
      />
    <MapContainer center={centro} zoom={14} style={{ width: "100%", height: "60vh" }} keyboard={false}>
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
              pathOptions={{ color: colormap[routeIndex] }} 
              
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
        <LayersControl position="topright">
           
        </LayersControl>
       <Marker position={centro} key={`markerLeaflet-Base`} icon={iconBase2} />
       <FullscreenControl position="topright" />
    </MapContainer>
    </div>

  );
}

export default FullMapLeaflet;
