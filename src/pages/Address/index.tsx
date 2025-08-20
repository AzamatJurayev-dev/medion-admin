import { YMaps } from "@pbe/react-yandex-maps";
import GeocodeMap from "./components/Map";

const AddressPage = () => {
  return (
    <div>
          <YMaps
              
        query={{
          apikey: "75a8faf0-1d9a-4cca-ae43-127bc019aabd",
          load: "package.full",
        }}
      >
        <GeocodeMap />
      </YMaps>
    </div>
  );
};

export default AddressPage;
