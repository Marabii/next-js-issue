"use server";

const sendDataAction = async (
  state: State,
  formData: FormData
): Promise<State> => {
  console.log(formData);
  //Some form validation error occured for example:
  return {
    status: "failure",
    errors:
      "this isn't a real error, but just simulating an error that could occur in a big form with multiple inputs",
  };
};

export default sendDataAction;

export type State = {
  status: "success" | "failure";
  errors?: string;
} | null;
