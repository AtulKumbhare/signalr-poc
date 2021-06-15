import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  address: "",
};

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  address: yup.string().max(500).required("Address is required"),
});

const Forms = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Field type="text" name="address" />
          <ErrorMessage name="address" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
export default Forms;
