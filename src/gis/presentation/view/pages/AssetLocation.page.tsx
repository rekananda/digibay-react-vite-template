import GoogleMapWrapped from "@Molecule/Maps/GoogleMap";
import { Group } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

export default function AssetLocationPage() {
  const [data, setData] = useState<any>();
  const fetchNodes = useCallback(async () => {
    const response = await fetch(
      "https://dev.api.tirtaweningmap.digibay.id/nodes",
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setData(data.data);
  }, []);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  const onDataClickCallback = (data: any) => {
    window.open(data.link, "_blank", "noopener,noreferrer");
  };

  const [dataArray, setDataArray] = useState([
    {
      id: "5eca6d10-2955-4400-b3e5-4bd54c864db0",
      lines: [],
      name: "Node Example 1",
      geometry: {
        type: "Point",
        coordinates: [-6.910641571629496, 107.64683545667943],
      },
      link: "https://www.google.com/maps/place/6%C2%B054'38.9%22S+107%C2%B038'48.5%22E/@-6.910812,107.6442391,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.910812!4d107.646814?entry=ttu",
    },
  ]);

  return (
    <>
      <Group className="h-[91vh] w-full">
        <GoogleMapWrapped
          onDataClickCallback={onDataClickCallback}
          data={data}
        />
      </Group>
    </>
  );
}