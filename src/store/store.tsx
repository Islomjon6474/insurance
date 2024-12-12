import { makeAutoObservable, reaction, toJS } from "mobx";
import Cookies from "js-cookie";
import React from "react";
import * as r from "ramda";
import { Activity, Country, Program, UserData } from "../types";
import countriesData from "../data/countries";
import programsData from "../data/programs";
import activitiesData from "../data/activities";

export class FormStore {
  countries: Record<number, Country> = r.indexBy(r.prop("id"), countriesData);
  programs: Record<number, Program> = r.indexBy(r.prop("id"), programsData);
  activities: Record<string, Activity> = r.indexBy(
    r.prop("id"),
    activitiesData,
  );
  errorSections: string[] = [];
  formStates: string[] = ["info", "program"];
  possibleCoverageTypes: { value: string; title: string }[] = [
    { value: "single", title: " Однократное путешествие" },
    { value: "multiple", title: "Многократное путешествие" },
  ];
  currentFormState: string = "info";
  userData: UserData = {
    coverageType: "single",
    activityId: 0,
  } as UserData;
  addingCountry: boolean = false;
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => toJS(this.userData),
      (userData) => {
        localStorage.setItem("userData", JSON.stringify(userData));
      },
    );
  }

  loadUserData(): void {
    const data = localStorage.getItem("userData");
    this.userData = data ? JSON.parse(data) : this.getDefaultUserData();
  }

  getDefaultUserData(): UserData {
    return {
      coverageType: "single",
      activityId: 0,
    } as UserData;
  }

  get userPrograms() {
    return Object.values(this.userData.countryData || {}).flatMap((country) => {
      return country.programs.flatMap((program) => program.id);
    });
  }
  checkFormErrors(): boolean {
    this.errorSections = [];
    if (!this.userData.countryData) {
      this.errorSections.push("countryData");
    }
    if (!this.userData.startDate) {
      this.errorSections.push("startDate");
    }
    if (!this.userData.endDate) {
      console.log(this.userData.endDate, "endDate");
      this.errorSections.push("endDate");
    }
    if (!this.userData.activityId) {
      this.errorSections.push("activity");
    }
    if (!this.userData.phone) {
      this.errorSections.push("phone");
    }
    console.log(this.errorSections, "errorSections");
    return Boolean(!this.errorSections.length);
  }

  get formattedUserData() {
    return {
      country: Object.values(this.userData.countryData || {})
        .map((country) => country.name)
        .join(", "),
      coverageType: this.possibleCoverageTypes.find(
        (type) => type.value === this.userData.coverageType,
      )?.title,
      startDate: this.userData.startDate,
      endDate: this.userData.endDate,
      travelPurpose: this.activities[this.userData.activityId!].name,
    };
  }
}

export const FormStoreContext = React.createContext<FormStore>(null!);

export const useFormStore = () => {
  return React.useContext(FormStoreContext)!;
};
