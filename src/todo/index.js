import React, { useEffect, useRef, useState } from "react";
import "./todo.scss";
import { getApi } from "./api";
import { Loading } from "../component/loading";
import { notification } from "antd";
export default function Todo() {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [jobName, setJobName] = useState("");
  const [filter, setFilter] = useState("all");
  const openNotificationWithIcon = (type, mess, dess) => {
    api[type]({
      message: mess,
      description: dess,
    });
  };
  const getdata = () => {
    getApi(
      "https://670263b2bd7c8c1ccd3ebaeb.mockapi.io/todolist/",
      "get",
      (e) => {
        setData(e);
        setLoading(false);
      }
    );
  };
  const updatedata = (value) => {
    setLoading(true);
    getApi(
      "https://670263b2bd7c8c1ccd3ebaeb.mockapi.io/todolist/" + value.id,
      "put",
      () => {
        openNotificationWithIcon("success", "Cập nhật thành công", "");
        getdata();
      },
      JSON.stringify(value)
    );
  };
  const adddata = (title) => {
    setLoading(true);
    getApi(
      "https://670263b2bd7c8c1ccd3ebaeb.mockapi.io/todolist",
      "post",
      () => {
        setJobName("");
        openNotificationWithIcon("success", "Thêm thành công", "");
        getdata();
      },
      JSON.stringify({ name: title, status: false })
    );
  };
  useEffect(() => {
    setLoading(true);
    getdata();
  }, []);
  return (
    <div className="todo-container">
      {contextHolder}
      <div className="todo-content">
        {loading && <Loading></Loading>}
        <h2 className="todo-name">Todo List</h2>
        <div className="todo-addinput">
          <input
            placeholder="Nhập tên tác vụ..."
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="todo-input"
          ></input>
          <button
            onClick={() => {
              if (!jobName)
                return openNotificationWithIcon(
                  "warning",
                  "Cảnh báo",
                  "Tên tác vụ không được để trống!"
                );
              adddata(jobName);
            }}
            className="todo-bt"
          >
            Thêm tác vụ
          </button>
          <div className="todo-filter">
            <label>
              <input
                name="filter"
                value={"all"}
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
                type="radio"
                className="bt-success"
              ></input>{" "}
              Tất cả
            </label>
            <label>
              <input
                name="filter"
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
                type="radio"
                value={"true"}
                className="bt-success"
              ></input>{" "}
              Hoàn thành
            </label>
            <label>
              <input
                onClick={(e) => {
                  setFilter(e.target.value);
                }}
                value={"false"}
                name="filter"
                type="radio"
                className="bt-success"
              ></input>{" "}
              Chưa hoàn thành
            </label>
          </div>
        </div>
        <div className="todo-listjob">
          {data
            ?.filter((i) => {
              if (filter === "all") return i;
              return i.status + "" == filter;
            })
            .map((i) => {
              return (
                <div
                  key={i.id}
                  className={`todo-listjob-i ${i.status ? "success" : ""}`}
                >
                  <input
                    checked={i.status}
                    onChange={(e) => {
                      updatedata({ ...i, status: e.target.checked });
                    }}
                    type="checkbox"
                    className="bt-success"
                  ></input>
                  <div className="todo-i-content">{i.name}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
