import { useTranslation } from "react-i18next";

import ReviewsTable from "./components/ReviewsTable";
const ReviewsPage = () => {
  //   const [selectedAward, setSelectedAward] = useState(null);
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-3xl">{t("Reviews")}</p>
      </div>
      <ReviewsTable />
    </div>
  );
};

export default ReviewsPage;
