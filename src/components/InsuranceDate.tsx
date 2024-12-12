import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

interface InsuranceStartDateProps {
  initialDate?: Date;
  onChange?: (date: moment.Moment | null) => void;
}

const InsuranceDate: React.FC<InsuranceStartDateProps> = observer(
  ({ initialDate, onChange }) => {
    const initialMoment = initialDate ? moment(initialDate) : moment();
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
      initialMoment,
    );
    const [open, setOpen] = useState(false);

    const currentDay = initialMoment.date();
    const currentMonth = initialMoment.month() + 1; // moment months are 0-indexed
    const currentYear = initialMoment.year();

    const [day, setDay] = useState(currentDay);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const monthNames = moment.months();

    useEffect(() => {
      const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
      if (date.isValid()) {
        setSelectedDate(date);
        if (onChange && selectedDate) {
          onChange(selectedDate);
        }
      }
    }, [day, month, year]);

    const days = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => i + 1,
    );
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from(
      { length: 10 },
      (_, i) => initialMoment.year() - i,
    );

    const handleDatePickerChange = (date: moment.Moment | null) => {
      if (date) {
        setDay(date.date());
        setMonth(date.month() + 1);
        setYear(date.year());
        setSelectedDate(date);
        setOpen(false);
      }
    };

    const handleCalendarIconClick = () => {
      setOpen(!open);
    };

    return (
      <div className="flex items-center space-x-3">
        <select
          className="form-select outline-none rounded-lg bg-blueBg text-grayText p-1 "
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className="form-select outline-none rounded-lg bg-blueBg text-grayText p-1 "
          value={month - 1}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="form-select outline-none rounded-lg bg-blueBg text-grayText p-1"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <DatePicker
          value={selectedDate}
          onChange={handleDatePickerChange}
          open={open}
          className="rounded-xl"
          onOpenChange={setOpen}
          renderExtraFooter={() => (
            <CalendarOutlined onClick={handleCalendarIconClick} />
          )}
          disabledDate={(current) =>
            current && current < moment(initialDate).startOf("day")
          }
        />
      </div>
    );
  },
);

export default InsuranceDate;
