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
    <form onSubmit={(event) => handleSubmit(event)} className="w-96">
      <div className="form-group mb-6">
        <div className="center mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label mb-2 inline-block font-semibold text-black"
          >
            Insert URL of <span className="text-teal-400">Article </span>:
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
                        border-black bg-white
                        bg-clip-padding px-3 py-1.5
                        text-base
                        font-normal
                        text-neutral-100
                        transition
                        ease-in-out focus:border-teal-400 focus:bg-white focus:outline-none
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
                  duration-350
                  hover:border-1
                  rounded
                  bg-white
                  px-6
                  py-2.5
                  text-sm
                  font-medium
                  uppercase
                  leading-tight
                  text-black shadow-md
                  transition ease-in-out hover:shadow-lg
                  focus:shadow-lg focus:outline-none
                  focus:ring-0
                  active:shadow-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default SubmitForm;
