import React, { useContext } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";
import { runInAction } from "mobx";
import moment from "moment";

interface UserDataProps {
  data: {
    country: string;
    coverageType: string;
    startDate: string;
    endDate: string;
    travelPurpose: string;
  };
  onEdit: (field: keyof UserDataProps["data"]) => void;
}

const UserDataSummary: React.FC = observer(() => {
  const formStore = useContext(FormStoreContext);
  const fieldNames: Record<keyof UserDataProps["data"], string> = {
    country: "Страна путешествия",
    coverageType: "Тип покрытия",
    startDate: "Начало страхования",
    endDate: "Конец страхования",
    travelPurpose: "Цель",
  };

  const formatDate = (date: Date) => moment(date).format("DD/MM/YYYY");
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Ваши данные</h3>
      <ul>
        {Object.entries(formStore.formattedUserData).map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between items-center gap-5 mb-2"
          >
            <div className="flex-grow">
              <div className="font-medium text-sm">
                {fieldNames[key as keyof UserDataProps["data"]]}
              </div>
              <div className="text-gray-600">
                {key.includes("Date")
                  ? formatDate(new Date(value || ""))
                  : value}
              </div>
            </div>
            <button
              onClick={() => {
                runInAction(() => {
                  formStore.currentFormState = "info";
                });
              }}
            >
              <PencilIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default UserDataSummary;
