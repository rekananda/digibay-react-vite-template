import { PropBaseT } from "@/common/presentation/view/types";
import { Fragment, useEffect } from "react";
import { WmsLayerConfig } from "./types";

type WmsLayerWrappedProps = {
  map: google.maps.Map;
  configs: WmsLayerConfig[];
} & PropBaseT;
const WmsLayerWrapped = (props: WmsLayerWrappedProps) => {
  return (
    <Fragment>
      {props.configs.map((config: WmsLayerConfig, index: number) => (
        <WmsLayer map={props.map} key={`wmsLayer` + index} config={config} />
      ))}
    </Fragment>
  );
};

type WmsLayerProps = {
  map: google.maps.Map;
  config: WmsLayerConfig;
} & PropBaseT;
const WmsLayer = (props: WmsLayerProps) => {
  useEffect(() => {
    if (props.map) {
      const wmsTileLayer = new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          const proj = props.map.getProjection();
          const zfactor = Math.pow(2, zoom);

          // Get the tile bounds
          const top = proj?.fromPointToLatLng(
            new window.google.maps.Point((coord.x * 256) / zfactor, (coord.y * 256) / zfactor),
          );
          const bot = proj?.fromPointToLatLng(
            new window.google.maps.Point(
              ((coord.x + 1) * 256) / zfactor,
              ((coord.y + 1) * 256) / zfactor,
            ),
          );

          // Create the BBOX parameter
          const bbox = `${top?.lng()},${bot?.lat()},${bot?.lng()},${top?.lat()}`;
          const url = `${props.config.url.split("&bbox=")[0]}&bbox=${bbox}&width=256&height=256`;

          return url;
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity: 0.6,
        name: "WMS Layer",
      });

      props.map.overlayMapTypes.push(wmsTileLayer);
    }
  }, [props.map]);

  return null;
};

export default WmsLayerWrapped;
