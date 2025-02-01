export type GeoJsonTypes =
  | "Point"
  | "LineString"
  | "Polygon"
  | "MultiPoint"
  | "MultiLineString"
  | "MultiPolygon"
  | "GeometryCollection"
  | "Feature"
  | "FeatureCollection";

export interface GeoJsonObject {
  type: GeoJsonTypes;
  bbox?: number[];
}

export interface GeometryObject extends GeoJsonObject {
  coordinates: any; // Will be specified more concretely in each geometry type
}

export interface Point extends GeometryObject {
  type: "Point";
  coordinates: [number, number];
}

export interface LineString extends GeometryObject {
  type: "LineString";
  coordinates: [number, number][];
}

export interface Polygon extends GeometryObject {
  type: "Polygon";
  coordinates: [number, number][][];
}

export interface MultiPoint extends GeometryObject {
  type: "MultiPoint";
  coordinates: [number, number][];
}

export interface MultiLineString extends GeometryObject {
  type: "MultiLineString";
  coordinates: [number, number][][];
}

export interface MultiPolygon extends GeometryObject {
  type: "MultiPolygon";
  coordinates: [number, number][][][];
}

export interface GeometryCollection extends GeoJsonObject {
  type: "GeometryCollection";
  geometries: GeometryObject[];
}

export type WmsLayerConfig = {
  url: string;
};
