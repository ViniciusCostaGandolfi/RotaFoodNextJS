'use client'
import "leaflet/dist/leaflet.css";
// import "leaflet.awesome-markers";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";
import createColormap from "colormap";
import { useEffect, useState } from "react";
// import MapsLeaflet from "./MapsLeaflet";
import LinkButton from "./LinkButton";
import { IRoute } from "../../interfaces/IRoute";
import dynamic from "next/dynamic";
import {Text} from '@/components/ui/text';
import SubMapRoute from "./SubMapRoute";






interface Props {
  routes: IRoute[];
}


function SubMapsRoutesLeaflet({ routes }: Props) {
  const DynamicMapsLeaflet = dynamic(
    () => import('./SubMapRoute'),
    { ssr: false }
  );
  const [link, setLinks] = useState<string[]>([])
  
  useEffect(() => {
    routes.map((route) => {
      let linkGoogleMaps = 'https://www.google.com/maps/dir/';
      let sequence = route.sequence;
      let points = route.points;
    
      sequence.map((index) => {
        linkGoogleMaps = linkGoogleMaps.concat(`${points[index][0]},${points[index][1]}/`)
        return 0
      })

      setLinks((prevState) => [...prevState, linkGoogleMaps])

      return 0
    })
  }, [routes])

  
  
  const colormap = createColormap<"hex">({
    alpha: 1,
    colormap: "rainbow",
    nshades: routes.length > 9 ? routes.length : 9,
    format: "hex",
  });

  return (
    <div className="w-full">
      {routes.map((route, index) => {
        return (
          <div key={index} className="w-full h-72 p-3">
            <Text className="text-xl text-primary" >Rota {index+1}</Text>
            <div className="w-full h-40vh">

                <DynamicMapsLeaflet route={route} color={colormap[index]}/> 
            </div>
            <LinkButton link={link[index]} id={index} nome={`Rota ${index+1}`} />
        </div>
        );
      })}
    </div>

  );
}

export default SubMapsRoutesLeaflet;
