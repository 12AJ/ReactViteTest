import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import UserPopup from "./UserPopup.jsx";
import AddUser from "./AddUser.jsx";

const UserList = () => {
   
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [deleted, setDeleted] = useState([]);
  const [userData, setUserData] = useState("");
  const [addUserPopup, setAddUserPopup] = useState(false);

  const fetchUsers = async (page, size = perPage) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8888/user/getUsers?page=${page}&per_page=${size}`
    );

  setData(response.data.data)

  console.log(response.data.data,"---");
    setTotalRows(response.data.totalItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleDelete = useCallback(
    row => async () => {
      // await axios.delete(`https://reqres.in/api/users/${row.id}`);
      // const response = await axios.get(
      //   `https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
      // );

      // setData(removeItem(response.data.data, row));
      // setTotalRows(totalRows - 1);
    },
    [currentPage, perPage, totalRows]
  );

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Employee ID',
      selector: row => row.empid,
      sortable: true,
    },

    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => {return row.status ?  'Active' : 'Inactive' },
      sortable: true,
    },

    {
      name: 'Action',
      cell: row => <button onClick={()=>openPopup(row)}>Edit</button>
    }
  ];
  


  const handlePageChange = page => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };


function openPopup(rowData) {
  setUserData(rowData);
}


  return (
    <>

<button onClick={()=>setAddUserPopup(true)}>Add User </button>

{addUserPopup && (<AddUser setAddUserPopup={setAddUserPopup}/>)}

    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      
      // selectableRows
      // onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />
    {userData !== "" && (<UserPopup userData={userData} setUserData={setUserData} />)}
    </>
  );
}

export default UserList;

 