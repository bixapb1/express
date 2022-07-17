import React from "react";
import { useForm } from "react-hook-form";
import style from "../style/form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setOrder, setSnackOpen } from "../redux/action";
export default function Form() {
  const dispach = useDispatch();
  const { order } = useSelector((state) => state);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (order.length === 0) {
      alert("Сart is empty");
    } else {
      const settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch(`/api/orders`, settings);
      reset();
      localStorage.setItem("order", JSON.stringify([]));
      dispach(setSnackOpen(true));
      dispach(setOrder([]));
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        hidden
        {...register("order")}
        defaultValue={JSON.stringify(order)}
      />

      <label className={style.label}>Name</label>
      <input
        className={style.input}
        type="text"
        {...register("name", { required: true, maxLength: 100 })}
      />
      <span className={style.error}>
        {errors.name?.type === "required" && "Name is required"}
      </span>

      <label className={style.label}>Email</label>
      <input
        className={style.input}
        type="text"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email Format",
          },
        })}
      />
      <span className={style.error}>{errors.email?.message}</span>
      <label className={style.label}>Phone</label>
      <input
        className={style.input}
        type="tel"
        {...register("phone", {
          required: "Phone is required",
          maxLength: {
            value: 16,
            message: "This input must not exceed 17 characters",
          },
          minLength: {
            value: 8,
            message: "This input must exceed 7 characters",
          },
        })}
      />
      <span className={style.error}>
        <span className={style.error}>{errors.phone?.message}</span>
      </span>
      <label className={style.label}>Address</label>
      <input
        className={style.input}
        type="text"
        {...register("address", { required: true, maxLength: 200 })}
      />
      <span className={style.error}>
        {errors.address?.type === "required" && "Address is required"}
      </span>
      <input className={style.input} type="submit" value={"Submit"} />
    </form>
  );
}
