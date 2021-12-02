import { useState } from "react";
import AddUser from "../actions/AddUser";
import axios from "axios";
import { user } from "../interfaces/InterfaceUser";
import SearchUser from "../actions/SearchUser";
import Pagination from "./Pagination";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState<user[]>([
    {
      id: 1,
      Name: "Linh",
      BoD: new Date(),
      Gender: true,
      Address: "Soc Trang",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPage, setItemPage] = useState(5);
  const [editUser, seteditUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  let navigate = useNavigate();
  function handleClick() {
    navigate("/UserDetail");
  }
  // useEffect(() => {
  //     axios({
  //         headers: {
  //             "x-access-token": "" + localStorage.getItem('accessToken')
  //         },
  //         method: 'GET',
  //         url: 'http://localhost:5000/users'
  //     }).then(res => {
  //         setUser(res.data.result)
  //     }).catch(err => {
  //         console.log(err)
  //     })
  // }, [])
  const indexOfLast = currentPage * itemPage;
  const indexOfFirst = indexOfLast - itemPage;
  const currentPost = users.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const onDelete = (id: number) => {
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

  const showUser = () => {
    var result = null;
    if (currentPost.length > 0) {
      result = currentPost.map((user, index) => {
        var statusGender = user.Gender ? "Male" : "Female";
        var statusClass = user.Gender ? "warning" : "default";
        return (
          <tr onClick={handleClick} style={{ cursor: "pointer" }}>
            <td>{index + 1}</td>
            <td>{user.Name}</td>
            <td>{format(user.BoD, "dd-MM-yyyy")}</td>
            <td>
              <span className={`label label-${statusClass}`}>
                {statusGender}
              </span>
            </td>
            <td>{user.Address}</td>
            <td>
              {/* <button
                                type="button"
                                className="btn btn-primary btnUpdate"

                                onClick={() => onUpdate(user.id)}
                            >Update</button> */}
              <button
                type="button"
                className="btn btn-danger btnUpdate"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
              {/* <button
                                onClick={() => onDelete(user.id)}
                                className="btn btn-success btnUpdate"
                            >Detail</button> */}
            </td>
          </tr>
        );
      });
    }
    return result;
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
            <tbody>{showUser()}</tbody>
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
