import React, { useState } from "react";
import { YMaps, Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import type { IGeocodeResult } from "yandex-maps";

type CoordinatesType = [number, number];

interface IMapClickEvent {
  get: (key: string) => CoordinatesType;
}

interface IAddress {
  location: string;
  route: string;
}

const MapContent: React.FC = () => {
  const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null);
  const [address, setAddress] = useState<IAddress | null>(null);

  const ymaps = useYMaps(["geocode"]);

  const handleClickMap = (e: IMapClickEvent) => {
    const coords = e.get("coords");
    if (!coords) return;

    setCoordinates(coords);

    ymaps
      ?.geocode(coords)
      .then((result) => {
        const foundAddress = handleGeoResult(result);
        if (foundAddress) setAddress(foundAddress);
      })
      .catch((error: unknown) => {
        console.log("Ошибка геокодирования", error);
        setAddress(null);
      });
  };

  function handleGeoResult(result: IGeocodeResult) {
    const firstGeoObject = result.geoObjects.get(0);

    if (firstGeoObject) {
      const properties = firstGeoObject.properties;

      const location = String(properties.get("description", {}));
      const route = String(properties.get("name", {}));

      const foundAddress = {
        location,
        route,
      };

      return foundAddress;
    }
  }

  console.log("Tanlangan:", coordinates, address);

  return (
    <Map
      defaultState={{ center: [41.2995, 69.2401], zoom: 10 }}
      width="100%"
      height="400px"
      onClick={handleClickMap}
    >
      {coordinates && <Placemark geometry={coordinates} />}
    </Map>
  );
};

const YandexMap: React.FC = () => {
  return (
    <YMaps
      query={{
        apikey: "75a8faf0-1d9a-4cca-ae43-127bc019aabd",
        load: "package.full",
      }}
    >
      <MapContent />
    </YMaps>
  );
};

export default YandexMap;
