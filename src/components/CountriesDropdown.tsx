import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FormStoreContext } from "../store/store";
import { runInAction } from "mobx";

const CountriesDropdown = observer(({ countryId }: { countryId?: number }) => {
  const formStore = useContext(FormStoreContext);
  const { countries, userData } = formStore;
  const country = countries[countryId!] ?? null;

  const handleCountrySelect = (selectedCountryId: number) => {
    runInAction(() => {
      if (
        countryId &&
        userData.countryData &&
        countryId in userData.countryData
      ) {
        delete userData.countryData[countryId];
      }

      const selectedCountry = countries[selectedCountryId];
      if (selectedCountry) {
        userData.countryData = {
          ...userData.countryData,
          [selectedCountryId]: selectedCountry,
        };
      }

      runInAction(() => {
        formStore.addingCountry = false;
      });
    });
  };

  return (
    <Menu as="div" className="relative w-full">
      {({ open }) => (
        <div>
          <Menu.Button
            className={`w-full bg-blueBg text-grayText px-4 py-2 rounded-xl flex justify-between items-center`}
          >
            {country?.name || "Select Country"}
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${open ? "transform rotate-180" : ""}`}
            />
          </Menu.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              static
              className="absolute w-full z-10 mt-1 origin-top-right bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none rounded-md"
            >
              {Object.values(countries).map((country) => {
                return (
                  <Menu.Item key={country.id}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-grayText text-white" : "text-lightGray"
                        } group flex w-full items-center hover:bg-grayText hover:text-white justify-start text-start px-4 py-2 text-sm`}
                        onClick={() => handleCountrySelect(country.id)}
                      >
                        {country.name}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
});

export default CountriesDropdown;
