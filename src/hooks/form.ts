import { createFormHook } from "@tanstack/react-form";

import {
  SubscribeButton,
  TextArea,
  TextField,
} from "../components/elements/FormComponents";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
