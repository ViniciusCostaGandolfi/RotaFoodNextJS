/* eslint-disable no-duplicate-imports */
import { MapContainer, TileLayer, Marker, Polyline, LayersControl } from "react-leaflet";
import { LatLngLiteral, LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import createColormap from "colormap";
import { ChangeEvent, useEffect, useState } from "react";
import { IRoute } from "@/interfaces/IRoute";
import {Text} from "@/components/ui/text"
import { FullscreenControl } from "react-leaflet-fullscreen";
import Select from "../ui/select";




interface Props {
  routes: IRoute[];
}

interface IRouteSelect {
  routes: IRoute[];
  name: string;
  value: string;
}

function FullMapLeaflet({ routes }: Props) {
  // const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
    // const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [selectedRoutes, setSelectedRoutes] = useState([{
    name: 'Todas as Rotas',
    value: 'allRoutes',
    routes: routes
  }]);
  const [selectedRoute, setSelectedRoute] = useState<IRouteSelect>(selectedRoutes[0]);
  useEffect(() => {
    routes.map((route, index) => {
      setSelectedRoutes((prevState) => [...prevState, {name: `Route ${index}`, value: `route${index}`,routes: [route]}])
      return null
    })
  }, [routes])



  const iconEntrega = icon({
    iconUrl: "/images/locality_icon.png",
    iconSize: [15, 20],
  });


  const iconBase2 = icon({
    iconUrl: "/images/house_icon2.png", 
    iconSize: [35, 35],
  });


  const firstRoute = routes[0];
  const points = firstRoute.points;

  const centro: LatLngLiteral = {
    lat: points[0][0],
    lng: points[0][1],
  };

  const colormap = createColormap<"hex">({
    alpha: 1,
    colormap: "rainbow",
    nshades: routes.length > 9 ? routes.length : 9,
    format: "hex",
  });

  const handleMarkerClick = (id: string) => {
    console.log(id);
  };

  return (
    <div className="w-full h-full pt-5" >

      <Text className="text-primary text-xl">Mapa Completo</Text>
      <Select
        options={selectedRoutes}
        value={selectedRoute ? selectedRoute.name : "Todas as Rotas"}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const selectedRouteName = event?.target?.value; //type: ignore
          const selectedRouteSelect = selectedRoutes.find((route) => route.name === selectedRouteName);

          if (selectedRouteSelect !== undefined) {
            setSelectedRoute(selectedRouteSelect);
          }
        }}
        label="Rotas"
        getOptionValue={(option) => option.name}
      />
    <MapContainer center={centro} zoom={14} style={{ width: "100%", height: "60vh" }} keyboard={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {selectedRoute.routes.map((objeto, index) => {
        const posicoes: LatLngExpression[] = objeto.points.map((point) => [point[0], point[1]]);
        const sequence = objeto.sequence;

        return (
          <div key={`route_line-${index}`}>
            {posicoes.map((posicao, i) => {
              if (i !== posicoes.length && i !== 0) return (
                  <Marker
                    position={posicao}
                    key={`markerLeaflet-${index}-${i}`}
                    icon={iconEntrega}
                    eventHandlers={{
                      click: () => handleMarkerClick(`${index}-${i}`),
                    }}
                  />
              )
            })}
            <Polyline  key={`route${index}`} positions={sequence.map((i) => posicoes[i])} pathOptions={{ color: colormap[index] }} />
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
