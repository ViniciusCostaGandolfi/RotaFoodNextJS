

export interface IOrderRoute {
  locale: [number, number],
  volume: number,
  id: number

}


export interface IRoute {
    points: [number, number][];
    distance: number;
    sequence: number[];
    volume: number;
    name: string;
    orders?: IOrderRoute[]
  } 

interface ResponseRoutes {
  routes: IRoute[],
  solving_time: number
}