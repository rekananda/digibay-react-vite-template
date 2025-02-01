import { PropBaseT } from "@/common/presentation/view/types";
import { Marker, Polygon, Polyline } from "@react-google-maps/api";
import { Fragment } from "react";
import { GeometryObject } from "./types";

type GoogleMapWrappedProps = {
  data: any | Array<any>;
  onClickCallback?: (data: any) => any | undefined;
} & PropBaseT;
const ReviewGeometry = (props: GoogleMapWrappedProps) => {
  const dataComponent = (data: any) => {
    if (Array.isArray(data)) {
      const componentWithConvertedData = data.map((eachData: any) => {
        let dataReturn = eachData;
        dataReturn = {
          ...dataReturn,
          geometry: convertGeometryToLatLng(dataReturn.geometry),
        };
        return chooseComponent(dataReturn);
      });
      return componentWithConvertedData;
    } else {
      let dataReturn = data;
      dataReturn = {
        ...dataReturn,
        geometry: convertGeometryToLatLng(dataReturn.geometry),
      };
      return chooseComponent(dataReturn);
    }
  };
  const convertGeometryToLatLng = (geometry: GeometryObject) => {
    let coordinatesTemp;
    if (geometry.type === "Point")
      coordinatesTemp = { lat: geometry.coordinates[0], lng: geometry.coordinates[1] };
    else if (geometry.type === "LineString")
      coordinatesTemp = geometry.coordinates.map((coordinate: [number, number][]) => {
        return {
          lat: coordinate[0],
          lng: coordinate[1],
        };
      });
    else if (geometry.type === "Polygon")
      coordinatesTemp = geometry.coordinates.map((coordinate1: [number, number][][]) => {
        return coordinate1.map((coordinate: [number, number][]) => {
          return {
            lat: coordinate[0],
            lng: coordinate[1],
          };
        });
      });
    return {
      ...geometry,
      coordinates: coordinatesTemp,
    };
  };
  const chooseComponent = (data: any) => {
    switch (data.geometry.type) {
      case "Point":
        return (
          <Marker
            onClick={() => {
              if (props.onClickCallback) props.onClickCallback(data);
            }}
            key={data.id}
            position={data.geometry.coordinates}
          />
        );
      case "LineString":
        return (
          <Polyline
            onClick={() => {
              if (props.onClickCallback) props.onClickCallback(data);
            }}
            key={data.id}
            path={data.geometry.coordinates}
          />
        );
      case "Polygon":
        return (
          <Polygon
            onClick={() => {
              if (props.onClickCallback) props.onClickCallback(data);
            }}
            key={data.id}
            paths={data.geometry.coordinates}
          />
        );
      default:
        break;
    }
  };

  return <Fragment>{dataComponent(props.data)}</Fragment>;
};

export default ReviewGeometry;
