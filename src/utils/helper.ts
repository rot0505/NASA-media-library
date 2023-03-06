import { Rule } from "antd/lib/form";

export const validateMessages = {
  required: "${label} is required!",
  types: {
    date: "${label} is not a valid date!",
  },
};

export const searchValidator: Rule = {
  validator(_, value) {
    if (!value || /^[a-zA-Z0-9\s]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Search input can only contain letters, numbers and spaces"));
  },
};
