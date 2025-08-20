import { Map, Panorama, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { Button, Divider, Flex, Table, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import type { IGeocodeResult } from "yandex-maps";

type CoordinatesType = Array<number>;

interface IMapClickEvent {
  get: (key: string) => CoordinatesType;
}

interface IAddress {
  location: string;
  route: string;
}

interface ISavedObject {
  id: string;
  address: IAddress | null;
  coordinates: CoordinatesType | null;
}

const CENTER: CoordinatesType = [41.2995, 69.2401];
const ZOOM = 12;

const GeocodeMap = () => {
  const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null);
  const [address, setAddress] = useState<IAddress | null>(null);
  const [objectArray, setObjectArray] = useState<ISavedObject[]>([]);

  const ymaps = useYMaps(["geocode"]);

  const formattedCoordinates = coordinates
    ? `${coordinates[0]?.toFixed(6)}, ${coordinates[1]?.toFixed(6)}`
    : null;

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
      .catch(() => setAddress(null));
  };

  function handleGeoResult(result: IGeocodeResult) {
    const firstGeoObject = result.geoObjects.get(0);
    if (firstGeoObject) {
      return {
        location: String(firstGeoObject.properties.get("description", {})),
        route: String(firstGeoObject.properties.get("name", {})),
      };
    }
  }

  const handleSaveObject = () => {
    const localStorageObjects = localStorage.getItem("objects");
    const parsed = localStorageObjects ? JSON.parse(localStorageObjects) : [];

    const newObject: ISavedObject = {
      id: uuidv4(),
      address,
      coordinates,
    };

    const updated = [...parsed, newObject];
    localStorage.setItem("objects", JSON.stringify(updated));
    setObjectArray(updated);
  };

  const loadSavedObjects = () => {
    const localStorageObjects = localStorage.getItem("objects");
    if (localStorageObjects) {
      const parsedObjects = JSON.parse(localStorageObjects).map(
        (item: ISavedObject) => ({ ...item, key: item.id })
      );
      setObjectArray(parsedObjects);
    } else {
      setObjectArray([]);
    }
  };

  useEffect(() => {
    loadSavedObjects();
  }, []);

  const columns = [
    {
      title: "Локация",
      dataIndex: ["address", "location"],
      key: "address.location",
    },
    {
      title: "Адрес",
      dataIndex: ["address", "route"],
      key: "address.route",
    },
    {
      title: "Координаты",
      dataIndex: "coordinates",
      key: "coordinates",
      render: (coords: number[]) => `${coords[0]}, ${coords[1]}`,
    },
  ];

  return (
    <Flex vertical gap={16} style={{ width: "100%" }}>
      {/* Map va info card */}
      <Flex gap={12} style={{ width: "100%", height: 400 }}>
        {/* Chap card */}
        <Flex
          vertical
          style={{
            width: "25%",
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 12,
            justifyContent: "center",
          }}
        >
          {address ? (
            <Flex vertical gap={8} style={{ height: "100%" }}>
              <Flex vertical>
                <Typography.Text>Локация: {address.location}</Typography.Text>
                <Typography.Text>Адрес: {address.route}</Typography.Text>
                <Typography.Text>
                  Координаты: {formattedCoordinates}
                </Typography.Text>
              </Flex>
              <Divider style={{ margin: "8px 0" }} />
              <Flex style={{ flex: 1 }}>
                {coordinates ? (
                  <Panorama
                    key={coordinates.join(",")}
                    defaultPoint={coordinates}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  />
                ) : (
                  <Flex
                    vertical
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      border: "1px solid #ddd",
                      background: "#fafafa",
                      color: "#999",
                    }}
                  >
                    <FrownOutlined style={{ fontSize: 64 }} />
                    <Typography.Text>Панорама не найдена</Typography.Text>
                  </Flex>
                )}
              </Flex>
              <Button type="primary" onClick={handleSaveObject}>
                Сохранить
              </Button>
            </Flex>
          ) : (
            <Typography.Title level={5} style={{ textAlign: "center" }}>
              Выберите точку на карте
            </Typography.Title>
          )}
        </Flex>

        {/* Xarita */}
        <Map
          defaultState={{ center: CENTER, zoom: ZOOM }}
          onClick={handleClickMap}
          style={{
            width: "75%",
            border: "1px solid #ddd",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {coordinates && <Placemark geometry={coordinates} />}
        </Map>
      </Flex>

      {/* Saved objects jadvali */}
      <Table
        columns={columns}
        dataSource={objectArray}
        pagination={false}
        bordered
      />

      {/* Saved markers bilan map */}
      <Map
        defaultState={{ center: CENTER, zoom: ZOOM }}
        style={{
          width: "100%",
          height: 400,
          border: "1px solid #ddd",
          borderRadius: 10,
        }}
      >
        {objectArray.map(
          (obj) =>
            obj.coordinates && (
              <Placemark
                key={obj.id}
                geometry={obj.coordinates}
                properties={{
                  balloonContent: `<strong>${obj?.address?.location}</strong><br/>${obj?.address?.route}`,
                }}
              />
            )
        )}
      </Map>
    </Flex>
  );
};

export default GeocodeMap;
