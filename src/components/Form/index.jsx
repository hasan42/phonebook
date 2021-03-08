import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer, inject } from "mobx-react";

import bookPhoneStore from "../../store/bookPhoneStore";

/**
 * @description Строки ошибок
 */
const errorsString = {
  required: "Поле обязательно для заполнения",
  maxSize: "Слишком много символов. Максимум 50.",
  minSize: "Слишком мало символов. Минимум 2.",
  number: "Поле может содержать только цифры",
};

/**
 * @description Yup схема валидации.
 */
const addSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, errorsString.minSize)
    .max(50, errorsString.maxSize)
    .required(errorsString.required),
  lastName: Yup.string()
    .min(2, errorsString.minSize)
    .max(50, errorsString.maxSize)
    .required(errorsString.required),
  phone: Yup.number()
    .integer(errorsString.number)
    .required(errorsString.required),
});

/**
 * @description Начальные значения
 */
const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
};

const Form = inject("bookPhoneStore")(
  observer(() => {
    return (
      <div className="form mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={addSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await bookPhoneStore.add(values);
              setSubmitting(false);
              resetForm();
            } catch (error) {
              console.error("Ошибка:", error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    Имя
                  </label>
                  <input
                    className={`form-control ${
                      errors.firstName && touched.firstName ? "is-invalid" : ""
                    } ${
                      !errors.firstName && touched.firstName ? "is-valid" : ""
                    }`}
                    type="text"
                    name="firstName"
                    placeholder="Иван"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">
                    Фамилия
                  </label>
                  <input
                    className={`form-control ${
                      errors.lastName && touched.lastName ? "is-invalid" : ""
                    } ${
                      !errors.lastName && touched.lastName ? "is-valid" : ""
                    }`}
                    type="text"
                    name="lastName"
                    placeholder="Иванов"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  <div className="invalid-feedback">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="phone" className="form-label">
                    Телефон
                  </label>
                  <input
                    className={`form-control ${
                      errors.phone && touched.phone ? "is-invalid" : ""
                    } ${!errors.phone && touched.phone ? "is-valid" : ""}`}
                    type="text"
                    name="phone"
                    placeholder="1234567"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  <div className="invalid-feedback">
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                </div>
                <div className="col align-self-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  })
);

export default Form;
