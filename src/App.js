import React, { useState } from "react";
import Header from "./Components/Header";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

import './App.css'

const towers = ["А", "Б"];
const floors = Array.from(Array(25), (_, i) => (i + 3).toString());
const rooms = Array.from(Array(10), (_, i) => (i + 1).toString());

export const App = () => {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [tower, setTower] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [dateDirty, setDateDirty] = useState(false);
  const [timeDirty, setTimeDirty] = useState(false);
 
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "date":
        setDateDirty(true);
        break;
      case "time":
        setTimeDirty(true);
        break;
      
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTowerChange = (e) => {
    setTower(e.target.value);
  };

  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка заполнены ли все поля
    if (!name || !date || !time) {
      if (!name) {
        setNameDirty(true);
      }
      if (!date) {
        setDateDirty(true);
      }
      if (!time) {
        setTimeDirty(true);
      }
      return;
    }

    // Проверка есть ли такая бронь
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const existingBooking = bookings.find(
      (b) =>
        b.tower === tower &&
        b.floor === floor &&
        b.room === room &&
        b.date === date &&
        b.time === time
    );
    if (existingBooking) {
      Swal.fire(
        "Ошибка",
        "Это время уже забронировано. Пожалуйста, выберите другое время.",
        "error"
      );
      return;
    }

    
    const data = {
      name,
      tower,
      floor,
      room,
      date,
      time,
      comment,
    };
    console.log(JSON.stringify(data));
    Swal.fire("Супер", "Все получилось");
    setSuccess(true);
  };

  

  const handleClear = () => {
    setName("");
    setTower("");
    setFloor("");
    setRoom("");
    setDate("");
    setTime("");
    setComment("");
  };

 
return (
    <div>
      <Header title="Форма бронирования" />
      <main>
        <form className="Container" onSubmit={handleSubmit}>
          <ul className="flex-outer">
            <li>
              <label htmlFor="name-input">Введите ваше имя</label>
              
              <input
                name="name"
                id="name-input"
                type="text"
                value={name}
                onChange={handleNameChange}
                onBlur={blurHandler}
              />
              {nameDirty && !name && (
                <div className="error">Поле не может быть пустым</div>
              )}
            </li>
            <li>
              <label htmlFor="tower-select">Выберите башню:</label>
              <select
                id="tower-select"
                value={tower}
                onChange={handleTowerChange}
              >
                {towers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label htmlFor="floor-select">Выберите этаж:</label>
              <select
                id="floor-select"
                value={floor}
                onChange={handleFloorChange}
              >
                {floors.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label htmlFor="room-select">Выберите переговорную:</label>
              <select
                id="room-select"
                value={room}
                onChange={handleRoomChange}
              >
                {rooms.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <label htmlFor="date-input">Выберите дату:</label>
              <input
                name="date"
                id="date-input"
                type="date"
                value={date}
                onChange={handleDateChange}
                onBlur={blurHandler}
              />
              {dateDirty && !date && (
                <div className="error">Поле не может быть пустым</div>
                )}
            </li>
            <li>
              <label htmlFor="time-input">Выберите время:</label>
              <input
                name="time"
                id="time-input"
                type="time"
                value={time}
                onChange={handleTimeChange}
                onBlur={blurHandler}
              />
              {timeDirty && !time && (
                <div className="error">Поле не может быть пустым</div>
                )}
            </li>
            <li>
              <label htmlFor="comment-input">Комментарий:</label>
              <textarea
                name="comment"
                id="comment-input"
                value={comment}
                onChange={handleCommentChange}
              />
            </li>
            <li className="button-wrapper">
              <button type="submit">Забронировать</button>
              <button type="button" onClick={handleClear}>
                Очистить форму
              </button>
            </li>
          </ul>
          
        </form>
      </main>
    </div>
  );
};
export default App