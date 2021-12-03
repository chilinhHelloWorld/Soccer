import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { countries } from "../data/countries";
import { positions } from "../data/positions";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
import {
  NativeCountry,
  Position,
  User as EditUser,
  User,
} from "../interfaces/InterfaceUser";

interface IProps {
  user: EditUser[];
  setUser: React.Dispatch<React.SetStateAction<EditUser[]>>;
  userEdit: EditUser;
  onCloseForm: () => void;
  seteditUser: React.Dispatch<React.SetStateAction<never[]>>;
}
const EditUSer = ({ seteditUser, onCloseForm, userEdit }: IProps) => {
  console.log(userEdit);
  const { register, handleSubmit, reset, control } = useForm<User>({
    defaultValues: {
      playerName: userEdit?.playerName,
      position: {
        value: userEdit.position as string,
        // @ts-ignore
        label: positionsSearch[userEdit.position] as string,
      },
      nativeCountry: {
        value: userEdit.nativeCountry as string,
        // @ts-ignore
        label: countriesSearch[userEdit.nativeCountry] as string,
      },
    },
  });
  const [startDate, setStartDate] = useState(new Date(userEdit?.dateOfBirth));

  const onClear = () => {
    onCloseForm();
    reset();
    seteditUser([]);
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    data.nativeCountry = (data.nativeCountry as NativeCountry).value;
    data.position = (data.position as Position).value;
    data.dateOfBirth = new Date("2021-12-02T14:34:53.075Z");
    console.log(data);
    try {
      await axios({
        url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player`,
        method: "PUT",
        data,
      });
    } catch (error) {
      console.log(error);
    }

    onCloseForm();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-form-save">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={onClear}
              >
                &times;
              </button>
              <h4 className="modal-title titleForm">Add user</h4>
            </div>
            <div className="modal-body">
              <h4 className="titile1">Full name</h4>
              <div>
                <input
                  className="inputForm"
                  {...register("playerName", { required: true })}
                ></input>
              </div>
              <h4 className="titile1">Date of Birth</h4>
              <div>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={startDate}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      className="inputForm"
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <h4 className="titile1">Position</h4>
              <Controller
                name="position"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    className="select-position"
                    options={positions as any}
                    {...field}
                    styles={{
                      control: (base: any) => ({
                        ...base,
                        borderColor: "black",
                      }),
                    }}
                  />
                )}
              />

              <h4 className="titile1">Country</h4>
              <div>
                <Controller
                  name="nativeCountry"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="select-position"
                      options={countries as any}
                      {...field}
                      styles={{
                        control: (base: any) => ({
                          ...base,
                          borderColor: "black",
                        }),
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={onClear}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => onClear}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditUSer;
