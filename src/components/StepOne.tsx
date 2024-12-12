import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../store/store";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import CountriesDropdown from "./CountriesDropdown";
import Button from "./Button";
import { runInAction } from "mobx";
import DetailsWrapper from "./DetailsWrapper";
import { Coverage } from "../types";
import InsuranceDate from "./InsuranceDate";
import moment from "moment";
import activities from "../data/activities";
import PhoneNumberInput from "./PhoneNumberInput";

const StepOne: React.FC = observer(() => {
  const formStore = useContext(FormStoreContext);
  const { userData, addingCountry, possibleCoverageTypes } = formStore;

  const handleStartDateChange = (date: moment.Moment | null) => {
    if (date) {
      userData.startDate = date.toISOString();
      if (!userData.endDate || moment(userData.endDate).isBefore(date)) {
        userData.endDate = moment(date).add(1, "days").toISOString();
      }
    }
  };

  const handleEndDateChange = (date: moment.Moment | null) => {
    if (date) {
      console.log(date.toISOString(), "date");
      userData.endDate = date.toISOString();
    }
  };

  return (
    <div className="mx-auto flex py-4 flex-col">
      <h2 className={`text-xl text-darkBlue font-semibold`}>
        Покупка страхового полиса
      </h2>
      <DetailsWrapper
        value={"countryData"}
        title="Страна путешествия"
        description="Выберите страну, в которую вы планируете поездку."
      >
        <div className={`w-full flex justify-between gap-2`}>
          <div className={`w-full flex flex-col gap-2 max-h-[10rem]`}>
            {Object.values(userData.countryData || []).length
              ? Object.values(userData.countryData!).map((country) => {
                  return (
                    <div className={`flex gap-2 w-full`} key={country.id}>
                      <CountriesDropdown countryId={country.id} />
                      <Button
                        variant="primary"
                        onClick={() =>
                          runInAction(() => {
                            if (
                              country.id &&
                              userData.countryData &&
                              country.id in userData.countryData
                            ) {
                              delete userData.countryData[country.id];
                            }
                          })
                        }
                        className={`w-1/3`}
                        containerClassName={`flex justify-center items-center h-fit`}
                      >
                        <MinusIcon className={`w-5 h-5`} />{" "}
                      </Button>
                    </div>
                  );
                })
              : null}
            {(!Object.values(userData.countryData || []).length ||
              addingCountry) && <CountriesDropdown />}
          </div>
          <Button
            variant="primary"
            onClick={() =>
              runInAction(() => {
                formStore.addingCountry = true;
              })
            }
            className={`w-1/3`}
            containerClassName={`flex justify-center items-center h-fit`}
          >
            <PlusIcon className={`w-5 h-5`} />{" "}
          </Button>
        </div>
      </DetailsWrapper>
      <DetailsWrapper
        value={"coverageType"}
        title="Тип покрытия"
        description="Выберите тип покрытия страховки."
      >
        <div className="flex flex-col gap-1 text-sm">
          {possibleCoverageTypes.map((coverageType) => (
            <div
              key={coverageType.value}
              className={`flex items-center pxx-2 cursor-pointer `}
              onClick={() =>
                runInAction(() => {
                  userData.coverageType = coverageType.value as Coverage;
                })
              }
            >
              <CheckCircleIcon
                className={`h-4 w-4 mr-2 text-grayText ${userData.coverageType === coverageType.value && "text-green"}`}
              />
              {coverageType.title}
            </div>
          ))}
        </div>
      </DetailsWrapper>
      <DetailsWrapper
        value={"startDate"}
        title="Начало страхования"
        description="Выберите начало страхования."
      >
        <InsuranceDate
          initialDate={new Date(userData.startDate || new Date())}
          onChange={handleStartDateChange}
        />
      </DetailsWrapper>
      <DetailsWrapper
        value={"endDate"}
        title="Конец страхования"
        description="Выберите конец страхования."
      >
        <InsuranceDate
          initialDate={
            new Date(
              userData.endDate ||
                moment(userData.startDate || new Date())
                  .add(1, "days")
                  .toDate(),
            )
          }
          onChange={handleEndDateChange}
        />
      </DetailsWrapper>
      <DetailsWrapper
        value={"activity"}
        title="Цель"
        description="Выберите цель поездки."
      >
        <div className="flex gap-1 justify-around text-sm">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center pxx-2 cursor-pointer `}
              onClick={() =>
                runInAction(() => {
                  userData.activityId = activity.id;
                })
              }
            >
              <CheckCircleIcon
                className={`h-4 w-4 mr-2 text-grayText ${userData.activityId === activity.id && "text-green"}`}
              />
              {activity.name}
            </div>
          ))}
        </div>
      </DetailsWrapper>{" "}
      <DetailsWrapper
        value={"phone"}
        title="Телефон"
        description="Введите ваш номер телефона."
      >
        <PhoneNumberInput />
      </DetailsWrapper>
      <Button
        variant="secondary"
        onClick={() =>
          runInAction(() => {
            console.log(formStore.checkFormErrors());
            if (formStore.checkFormErrors()) {
              formStore.currentFormState = "program";
            }
          })
        }
        className={`w-full `}
        containerClassName={`flex justify-start items-center h-fit `}
      >
        Далее
      </Button>
    </div>
  );
});

export default StepOne;
