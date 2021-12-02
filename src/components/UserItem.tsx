const UserItem = () => {
    return (
        <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <span className='label label'>Male</span>
      </td>
      <td></td>
      <td>
        <button          
          className="btn btn-primary btnUpdate"
        >Update</button>
        <button
          type="button"
          className="btn btn-danger btnUpdate"
        >Delete</button>
        <button
          className="btn btn-success btnUpdate"
        >Detail</button>
      </td>
    </tr>
    )
}
export default UserItem;