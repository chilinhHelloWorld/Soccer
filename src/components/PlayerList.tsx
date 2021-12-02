import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUser from "../actions/AddUser";
import SearchUser from "../actions/SearchUser";
import { User } from "../interfaces/InterfaceUser";
import Pagination from "./Pagination";

const UserList = () => {
  const [users, setUser] = useState<User[]>([
    {
      id: "1",
      playerName: "Linh",
      dateOfBirth: new Date(),
      position: "Soc Trang",
      nativeCountry: "AAA",
      overall: 99,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPage, setItemPage] = useState(5);
  const [editUser, seteditUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  let navigate = useNavigate();

  function handleClick() {
    navigate("/detail");
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data } = await axios({
      method: "GET",
      url: `https://localhost:${process.env.REACT_APP_API_PORT}/api/Player`,
    });
    console.log(data);

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
      headers: {
        "x-access-token": "" + localStorage.getItem("accessToken"),
      },
      method: "DELETE",
      url: "http://localhost:5000/delete_user",
      data: { id },
    })
      .then((res) => {
        axios({
          headers: {
            "x-access-token": "" + localStorage.getItem("accessToken"),
          },
          method: "GET",
          url: "http://localhost:5000/users",
        })
          .then((res) => {
            setUser(res.data.result);
          })
          .catch((err) => {
            console.log(`load users fail ${err}`);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUpdate = (id: number) => {
    axios({
      headers: {
        "x-access-token": "" + localStorage.getItem("accessToken"),
      },
      method: "GET",
      url: "http://localhost:5000/get?id=" + id,
      data: null,
    }).then((response) => {
      seteditUser(response.data);
      setShowForm(true);
    });
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
        userEdit={editUser}
        seteditUser={seteditUser}
      ></AddUser>
    ) : (
      ""
    );
  };

  const onCloseForm = () => {
    setShowForm(false);
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
                <th>Gender</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr onClick={handleClick} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{user.playerName}</td>
                  <td>{format(new Date(user.dateOfBirth), "dd-MM-yyyy")}</td>

                  <td>{user.nativeCountry}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btnUpdate"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
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