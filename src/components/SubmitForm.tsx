import React from "react";

interface SubmitFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setInputValue: (value: string) => void;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  handleSubmit,
  setInputValue,
}: SubmitFormProps) => {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group mb-6">
        <div className="mb-3 xl:w-96">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label mb-2 inline-block font-semibold text-gray-700"
          >
            Insert URL of Article:
          </label>
          <input
            type="url"
            className="
                        form-control
                        m-0   
                        block
                        w-full
                        rounded
                        border
                        border-solid
                        border-gray-300
                        bg-white bg-clip-padding
                        px-3 py-1.5 text-base
                        font-normal
                        text-gray-700
                        transition
                        ease-in-out
                        focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
                        "
            id="exampleFormControlInput1"
            placeholder="Insert URL here"
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="
                  rounded
                  bg-blue-600
                  px-6
                  py-2.5
                  text-xs
                  font-medium
                  uppercase
                  leading-tight
                  text-white
                  shadow-md
                  transition duration-150
                  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none
                  focus:ring-0
                  active:bg-blue-800
                  active:shadow-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default SubmitForm;
