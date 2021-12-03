import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "../actions/AddUser";
import EditUser from "../actions/EditUser";
import SearchUser from "../actions/SearchUser";
import { countriesSearch } from "../data/countriesSearch";
import { positionsSearch } from "../data/positionsSearch";
import { User } from "../interfaces/InterfaceUser";
import Pagination from "./Pagination";
const UserList = () => {
  const [users, setUser] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPage, setItemPage] = useState(5);
  const [editUser, seteditUser] = useState([]);
  const [userDataEditing, setUserDataEditing] = useState<User>({} as User);
  const [showForm, setShowForm] = useState(false);
  const [isShowFormEdit, setIsShowFormEdit] = useState(false);
  let navigate = useNavigate();

  function handleClick(user: User) {
    navigate(`/detail/` + user.id);
  }

  useEffect(() => {
    fetchPlayers();
  }, []);
  const fetchPlayers = async () => {
    const { data } = await axios({
      method: "GET",
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player`,
    });

    setUser(data);
  };

  const indexOfLast = currentPage * itemPage;
  const indexOfFirst = indexOfLast - itemPage;
  const currentPost = users.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const onDelete = (id: string) => {
    axios({
      method: "DELETE",
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player/${id}`,
    })
      .then((res) => {
        console.log(res);
        fetchPlayers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEdit = (user: User) => {
    setUserDataEditing(user);
    setIsShowFormEdit(true);
  };

  const onSearch = (keyword: string) => {
    console.log(keyword);
    axios({
      headers: {
        "x-access-token": "" + localStorage.getItem("accessToken"),
      },
      method: "GET",
      url: "http://localhost:5000/search?keyword=" + keyword,
      data: null,
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showFormSave = () => {
    return showForm ? (
      <AddUser
        user={users}
        onCloseForm={() => onCloseForm()}
        setUser={setUser}
        //userEdit={editUser}
        seteditUser={seteditUser}
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

  return (
    <div className="container">
      <div>
        <button className="btn btn-primary btnAdd" onClick={() => onShowForm()}>
          Add New User
        </button>
        <SearchUser onSearch={onSearch}></SearchUser>
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
                  <td>{index + 1}</td>
                  <td>{user.playerName}</td>
                  <td>{format(new Date(user.dateOfBirth), "dd-MM-yyyy")}</td>

                  <td>
                    {
                      //@ts-ignore
                      positionsSearch[user.position]
                    }
                  </td>
                  <td>
                    {
                      //@ts-ignore
                      countriesSearch[user.nativeCountry]
                    }
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btnUpdate"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btnUpdate"
                      onClick={() => onEdit(user)}
                      style={{ zIndex: 500 }}
                    >
                      Edit
                    </button>
                    <Link
                      style={{ marginLeft: "10px" }}
                      to={`/detail/` + user.id}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemPage={itemPage}
            totalPage={users.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};
export default UserList;
