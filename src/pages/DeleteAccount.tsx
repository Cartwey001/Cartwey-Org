import cartweyLogo from "@/assets/Cartwey.svg";
import { Button, FormInput } from "@/components";
import { emailRegex } from "@/constants";
import * as yup from "yup";
import { useFormik } from "formik";

export const DeleteAccount = () => {
  const requestSchema = yup.object({
    name: yup.string().required("Please provid name"),
    email: yup
      .string()
      .required("Please provide email")
      .matches(emailRegex, "A valid email is required"),
    description: yup.string().required("Please describe your request"),
  });

  const defaultValues = { name: "", email: "", description: "" };

  const validation = useFormik({
    enableReinitialize: false,
    initialValues: defaultValues,
    validationSchema: requestSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleBlur, handleChange, handleSubmit, values } = validation;

  return (
    <div className="w-[90%] md:w-[85%] max-w-[900px] mx-auto py-12 flex flex-col items-center">
      <div>
        <img src={cartweyLogo} />
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mt-6 font-medium">
        Fill the form to make any request regarding your Cartwey account
      </h1>
      <p className="text-center text-base font-medium text-gray-900 my-6">
        Account deletion request, issues and complaints
      </p>
      <form className="w-full max-w-[500px]">
        <FormInput
          label="Name"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          validation={validation}
          value={values.name}
          placeholder="e.g. John Doe"
        />
        <FormInput
          label="Email"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          validation={validation}
          value={values.email}
          placeholder="e.g. example@gmail.com"
        />
        <FormInput
          label="Description"
          name="description"
          onBlur={handleBlur}
          onChange={handleChange}
          type="textarea"
          validation={validation}
          value={values.description}
          placeholder="Describe your request here."
        />
        <Button type="button" className="mt-8" onClick={handleSubmit}>
          Submit Request
        </Button>
      </form>
    </div>
  );
};
