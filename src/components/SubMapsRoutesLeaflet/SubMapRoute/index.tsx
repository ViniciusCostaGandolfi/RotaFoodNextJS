'use client'
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LatLngLiteral, LatLngExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet.awesome-markers";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";
import { IRoute } from "@/interfaces/IRoute";




interface Props {
  route: IRoute;
  color: string;
}


function SubMapRoute({ route, color }: Props) {
    const posicoes: LatLngExpression[] = route.points.map((ponto) => [ponto[0], ponto[1]]);
    const sequence = route.sequence;
    

    const iconEntrega = icon({
      iconUrl: "/images/icones/IconeEntrega.png",
      iconSize: [20, 20],
    });
    
    
    const iconBase2 = icon({
      iconUrl: "/images/icones/IconeRestaurante.png",
      iconSize: [40, 40],
    });
    
    const centro: LatLngLiteral = {
      lat: route.points[0][0],
      lng: route.points[0][1],
    };
    return (
            <MapContainer center={centro} zoom={13} className="w-full h-40 z-0" keyboard={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <div key={`objeto-${route}`}>
                {posicoes.map((posicao, i) => {
                  return (
                    <Marker
                        position={posicao}
                        key={`markerLeaflet-${i}`}
                        icon={iconEntrega}
                    />
                    )})}
                <Polyline positions={sequence.map((i) => posicoes[i])} pathOptions={{ color: color }} />
                </div>
            <Marker position={centro} key={`markerLeaflet-Base`} icon={iconBase2} />
          </MapContainer>
        )
}

export default SubMapRoute;
