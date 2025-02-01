import { PropBaseT } from "@/common/presentation/view/types";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, Fragment, memo, useCallback, useState } from "react";
import ReviewGeometry from "./ReviewGeometry";
import WmsLayerWrapped from "./WmsLayer";
import { GeoJsonTypes, WmsLayerConfig } from "./types";
import { Loader } from "@mantine/core";

type GoogleMapWrappedProps = {
  data?: any;
  geometryType?: GeoJsonTypes;
  mapOptions?: google.maps.MapOptions;
  mapZoom?: number;
  mapCenter?: google.maps.LatLngLiteral;
  mapType?: "view" | "input";
  name?: string;
  onDataClickCallback?: (data: any) => void;
  wmsLayerConfigs?: WmsLayerConfig[];
} & PropBaseT;
const GoogleMapWrapped = (props: GoogleMapWrappedProps) => {
  const mapContainerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
  };
  const mapCenter: google.maps.LatLngLiteral = props.mapCenter ?? {
    lat: -6.9004266547467745,
    lng: 107.61793016163462,
  };
  const mapZoom: number = props.mapZoom ?? 13;
  const mapOptions: google.maps.MapOptions = props.mapOptions ?? {
    mapTypeId: "terrain",
    disableDefaultUI: false,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
    clickableIcons: true,
    scrollwheel: true,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAB0beP_U6tXEqOsATEV8mvCjzERHfxmNM",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const onLoad: (map: google.maps.Map) => void | Promise<void> = useCallback(function callback(
    map: google.maps.Map,
  ) {
    setMap(map);
  }, []);

  const onUnmount: (map: google.maps.Map) => void | Promise<void> = useCallback(function callback(
    map: google.maps.Map,
  ) {
    setMap(null);
  }, []);

  const [inputLatLng, setInputLatLng] = useState<any>();
  const convertLatLngToGeometry = useCallback(() => {}, []);
  const onGoogleMapClick = (e: google.maps.MapMouseEvent) => {
    setInputLatLng;
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute z-0 h-full w-full">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
          onClick={onGoogleMapClick}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {props.data && (
            <ReviewGeometry data={props.data} onClickCallback={props.onDataClickCallback} />
          )}
          {/* For map input */}
          {props.mapType && props.geometryType && (
            <Fragment>
              <input
                className="hidden"
                name={props.name ?? undefined}
                value={JSON.stringify(convertLatLngToGeometry())}
                onChange={() => {}}
              />
              <ReviewGeometry data={undefined} />
            </Fragment>
          )}
          {/* Another Format Layer like WMS KML etc */}
          {props.wmsLayerConfigs && <WmsLayerWrapped map={map!} configs={props.wmsLayerConfigs} />}
        </GoogleMap>
      </div>
      {props.children}
    </div>
  );
};

export default memo(GoogleMapWrapped);
