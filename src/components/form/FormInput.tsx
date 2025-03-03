import { CSSProperties, useEffect, useState } from "react";
import FormFeedback from "./FormFeedback";
import styled from "styled-components";
import classNames from "classnames";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CheckboxItem = {
  id: string;
  value: string;
};

type RadioItem = {
  id: string;
  value: any;
  label: string;
};

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  onChange: any;
  onBlur: any;
  value: any;
  validation: any;
  options?: string[];
  disabled?: boolean;
  className?: string;
  min?: any;
  max?: any;
  defaultValue?: any;
  accept?: string;
  inputRef?: any;
  hidden?: boolean;
  handleFileChange?: any;
  lightMode?: boolean;
  description?: string;
  checkboxItems?: CheckboxItem[];
  noLabel?: boolean;
  inputStyle?: CSSProperties;
  radioOptions?: RadioItem[];
}

interface DetachableInputProps {
  id: string;
  onRemove: (id: string) => void;
  onChangeValue: (id: string, value: string) => void;
  value: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const FormInput = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  options,
  disabled,
  className,
  min,
  max,
  defaultValue,
  accept,
  hidden,
  inputRef,
  handleFileChange,
  lightMode = false,
  description,
  checkboxItems,
  noLabel,
  inputStyle,
  radioOptions,
}: FormInputProps) => {
  if (type === "file" && !handleFileChange)
    throw Error("File Change Handler Required For File Input");

  if (type === "checkbox" && !checkboxItems)
    throw Error("Checkbox items required for checkbox input");

  if (type === "radio-group" && !radioOptions)
    throw Error("Radio options required for radio group");

  if (type === "text") {
    return (
      <div className="mb-4 w-full">
        <label
          htmlFor={name}
          className={classNames(
            "block text-sm font-medium neue-regular text-black"
          )}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          className={classNames(
            "block border-[1px] rounded-md p-4 text-xs mt-2 w-full outline-none font-medium bg-[var(--input-bg)] cursor-pointer text-gray-800 border-[lightgray]",
            className
          )}
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4 w-full">
        {noLabel || (
          <label
            htmlFor={name}
            className={classNames("block text-sm font-medium text-black")}
          >
            {label}
          </label>
        )}

        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          className={classNames(
            className,
            "block border-[1px] rounded-md p-4 text-xs mt-2 w-full outline-none  font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer text-gray-800 border-[lightgray]"
          )}
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block text-sm font-medium text-black">
          {label}
        </label>
        <div className="relative flex items-center w-full">
          <SelectInput
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            className={classNames(
              "block border-[1px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer relative",
              className
            )}
          >
            <option value={""}>{placeholder}</option>
            {options &&
              options.map((opt) => (
                <option value={opt} className="px-4 py-2">
                  {opt.toUpperCase()}
                </option>
              ))}
          </SelectInput>

          <i className="fi fi-sr-caret-down absolute right-2 top-5 z-100"></i>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "chad-select") {
    return (
      <div className="mb-4 w-full">
        <label
          htmlFor={name}
          className={classNames("block text-sm font-medium text-black")}
        >
          {label}
        </label>
        <div className="relative flex items-center w-full mt-2">
          <Select
            onValueChange={(newValue: string) =>
              validation.setFieldValue(name, newValue)
            }
            defaultValue={defaultValue}
          >
            <CustomSelectTrigger
              className={classNames("w-full bg-transparent neue-regular", {
                "text-black": lightMode,
                "text-white": !lightMode,
              })}
              style={{
                border: "1px solid lightgray",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <SelectValue placeholder={placeholder} />
            </CustomSelectTrigger>
            <SelectContent
              className={classNames("z-[100000010]", {
                "bg-black": !lightMode,
                "bg-white": lightMode,
              })}
            >
              {options &&
                options.map((opt) => (
                  <SelectItem
                    value={opt}
                    className={classNames(
                      "px-4 py-2 cursor-pointer neue-regular",
                      {
                        "text-[lightgray]": !lightMode,
                        "text-gray-800": lightMode,
                      }
                    )}
                    aria-roledescription="button"
                    aria-role="button"
                  >
                    <span className="ml-3 neue-regular text-xs">
                      {opt[0].toUpperCase()}
                      {opt.slice(1)}
                    </span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          "block border-[1px] rounded-md p-4 text-xs mt-2 w-full outline-none border-[lightgray] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer",
          className
        )}
        min={min}
        max={max}
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const SelectInput = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const CustomSelectTrigger = styled(SelectTrigger)`
  &.focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  &::focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none;
  }

  span {
    margin-left: 0px;
  }
`;
