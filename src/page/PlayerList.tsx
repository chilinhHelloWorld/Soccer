import { Pagination } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddUser from "../actions/AddUser";
import EditUser from "../actions/EditUser";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
import { Player } from "../interfaces/Player";

const UserList = () => {
  const [users, setUser] = useState<Player[]>([]);
  const [editUser, seteditUser] = useState([]);
  const [userDataEditing, setUserDataEditing] = useState<Player>({} as Player);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(0);
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() => {
    return searchParams.has("page")
      ? parseInt(searchParams.get("page") as string)
      : 1;
  });

  const LIMIT = 8;

  function handleClick(user: Player) {
    navigate(`/detail/` + user.id);
  }

  useEffect(() => {
    fetchPlayers();
  }, [reload, page]);

  const fetchPlayers = async () => {
    const { data } = await axios({
      method: "GET",
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/Player/GetPaging?page=${page}&size=${LIMIT}`,
    });

    setTotalPlayers(data.total);
    setUser(data.players);
  };

  const submit = (user: Player) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(user.id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const onDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/Player/${id}`,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = (user: Player) => {
    setUserDataEditing(user);
    setIsShowFormEdit(true);
  };

  const showFormSave = () => {
    return showForm ? (
      <AddUser
        user={users}
        onCloseForm={() => onCloseForm()}
        setUser={setUser}
        //userEdit={editUser}
        seteditUser={seteditUser}
        reload={reload}
        setReload={setReload}
      ></AddUser>
    ) : (
      ""
    );
  };
  const showFormEdit = () => {
    return isShowFormEdit ? (
      <EditUser
        user={users}
        onCloseForm={() => onCloseForm()}
        setUser={setUser}
        userEdit={userDataEditing}
        seteditUser={seteditUser}
        reload={reload}
        setReload={setReload}
      />
    ) : (
      ""
    );
  };

  const onCloseForm = () => {
    setShowForm(false);
    setIsShowFormEdit(false);
  };
  const onShowForm = () => {
    setShowForm(true);
  };
  console.log(page);

  const onChange = (_: any, page: number) => {
    setPage(page);
  };

  return (
    <div className="container pt-4">
      <div>
        <button className="btn btn-primary btnAdd" onClick={() => onShowForm()}>
          Add New User
        </button>
      </div>
      <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 ">
        {showFormSave()}
      </div>
      <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 ">
        {showFormEdit()}
      </div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">List User</h3>
        </div>
        <div className="panel-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>DateOfBirth</th>
                <th>Position</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr style={{ cursor: "pointer", zIndex: -1 }}>
                  <td onClick={() => handleClick(user)}>
                    {(page - 1) * LIMIT + index + 1}
                  </td>
                  <td onClick={() => handleClick(user)}>{user.playerName}</td>
                  <td onClick={() => handleClick(user)}>
                    {format(new Date(user.dateOfBirth), "dd-MM-yyyy")}
                  </td>

                  <td onClick={() => handleClick(user)}>
                    {
                      //@ts-ignore
                      positionsSearch[user.position]
                    }
                  </td>
                  <td onClick={() => handleClick(user)}>
                    {
                      //@ts-ignore
                      countriesSearch[user.nativeCountry]
                    }
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btnUpdate"
                      onClick={() => submit(user)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btnUpdate"
                      onClick={() => onEdit(user)}
                      style={{ zIndex: 500 }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            count={Math.ceil(totalPlayers / LIMIT)}
            color="primary"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default UserList;
