import React from "react";
import styled from "styled-components";
import {
  Btn,
  BtnContainer,
  ModalListItemData,
} from "../../styles/Editor.styled";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

type EditorPublishDateProps = {
  reservationDate: {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: string;
  };
  setReservationDate: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
      date: number;
      hours: number;
      minutes: string;
    }>
  >;
};

function EditorPublishDate({
  reservationDate,
  setReservationDate,
}: EditorPublishDateProps) {
  const DateChange = (e: string) => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hours = today.getHours();
    if (e == "year+") {
      setReservationDate({
        ...reservationDate,
        year: reservationDate.year + 1,
      });
    } else if (e == "year-" && reservationDate.year > year) {
      setReservationDate({
        ...reservationDate,
        year: reservationDate.year - 1,
      });
    }
    // 월은 12월 개념
    else if (e == "month+" && reservationDate.month < 12) {
      setReservationDate({
        ...reservationDate,
        month: reservationDate.month + 1,
      });
    } else if (e == "month-") {
      // 같은 년도 인 경우에는 날짜가 현재 날짜보다 커야함
      if (reservationDate.year == year && reservationDate.month > month) {
        // 현재 일자보다 날짜가 이전 일 경우
        if (reservationDate.month - 1 == month && reservationDate.date < date) {
          setReservationDate({
            ...reservationDate,
            month: reservationDate.month - 1,
            date: date,
          });
        } else {
          setReservationDate({
            ...reservationDate,
            month: reservationDate.month - 1,
          });
        }
      } else if (reservationDate.year !== year && reservationDate.month > 1) {
        setReservationDate({
          ...reservationDate,
          month: reservationDate.month - 1,
        });
      }
      //
    } else if (e == "date+") {
      if (
        (reservationDate.month == 1 && reservationDate.date < 31) ||
        (reservationDate.month == 3 && reservationDate.date < 31) ||
        (reservationDate.month == 5 && reservationDate.date < 31) ||
        (reservationDate.month == 7 && reservationDate.date < 31) ||
        (reservationDate.month == 8 && reservationDate.date < 31) ||
        (reservationDate.month == 10 && reservationDate.date < 31) ||
        (reservationDate.month == 12 && reservationDate.date < 31)
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        (reservationDate.month == 4 && reservationDate.date > 30) ||
        (reservationDate.month == 6 && reservationDate.date > 30) ||
        (reservationDate.month == 9 && reservationDate.date > 30) ||
        (reservationDate.month == 11 && reservationDate.date > 30)
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (reservationDate.month == 2 && reservationDate.date < 28) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        // 윤년
        reservationDate.year % 4 == 0 &&
        reservationDate.year % 100 !== 0 &&
        reservationDate.month == 2 &&
        reservationDate.date > 29
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      } else if (
        // 윤년
        reservationDate.year % 400 == 0 &&
        reservationDate.year % 100 == 0 &&
        reservationDate.month == 2 &&
        reservationDate.date > 29
      ) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date + 1,
        });
      }
    } else if (e == "date-") {
      if (reservationDate.month == month && reservationDate.date > date) {
        if (reservationDate.date - 1 == date && reservationDate.hours < hours)
          setReservationDate({
            ...reservationDate,
            date: reservationDate.date - 1,
            hours: hours + 1,
          });
        else {
          setReservationDate({
            ...reservationDate,
            date: reservationDate.date - 1,
          });
        }
      } else if (reservationDate.month !== month && reservationDate.date > 1) {
        setReservationDate({
          ...reservationDate,
          date: reservationDate.date - 1,
        });
      }
    } else if (e == "hours+" && reservationDate.hours < 23) {
      setReservationDate({
        ...reservationDate,
        hours: reservationDate.hours + 1,
      });
    } else if (e == "hours-") {
      if (reservationDate.date == date && reservationDate.hours > hours + 1) {
        setReservationDate({
          ...reservationDate,
          hours: reservationDate.hours - 1,
        });
      } else if (reservationDate.date !== date && reservationDate.hours >= 1) {
        setReservationDate({
          ...reservationDate,
          hours: reservationDate.hours - 1,
        });
      }
    } else if (e == "minutes+" || e == "minutes-") {
      if (reservationDate.minutes == "00") {
        setReservationDate({
          ...reservationDate,
          minutes: "30",
        });
      } else if (reservationDate.minutes == "30") {
        setReservationDate({
          ...reservationDate,
          minutes: "00",
        });
      }
    }
  };

  return (
    <div>
      <ModalListItemData>
        <div>{reservationDate.year}년</div>
        <BtnContainer>
          <Btn onClick={() => DateChange("year-")}>
            <BiCaretDown />
          </Btn>
          <Btn onClick={() => DateChange("year+")}>
            <BiCaretUp />
          </Btn>
        </BtnContainer>
        <div>{reservationDate.month}월</div>
        <BtnContainer>
          <Btn onClick={() => DateChange("month-")}>
            <BiCaretDown />
          </Btn>
          <Btn onClick={() => DateChange("month+")}>
            <BiCaretUp />
          </Btn>
        </BtnContainer>
        <div>{reservationDate.date}일</div>
        <BtnContainer>
          <Btn onClick={() => DateChange("date-")}>
            <BiCaretDown />
          </Btn>
          <Btn onClick={() => DateChange("date+")}>
            <BiCaretUp />
          </Btn>
        </BtnContainer>
        <div>{reservationDate.hours}시</div>
        <BtnContainer>
          <Btn onClick={() => DateChange("hours-")}>
            <BiCaretDown />
          </Btn>
          <Btn onClick={() => DateChange("hours+")}>
            <BiCaretUp />
          </Btn>
        </BtnContainer>
        <div>{reservationDate.minutes}분</div>
        <BtnContainer>
          <Btn onClick={() => DateChange("minutes-")}>
            <BiCaretDown />
          </Btn>
          <Btn onClick={() => DateChange("minutes+")}>
            <BiCaretUp />
          </Btn>
        </BtnContainer>
      </ModalListItemData>
    </div>
  );
}

export default EditorPublishDate;
