import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    toast.success("Deleted successfully!");
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 mt-2">Users List</h2>
      <ul className="flex flex-col w-full space-y-5">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col md:flex-row items-center md:items-start border-t border-b border-slate-400 pt-3 md:pt-0"
          >
            <img src={user.avatar} alt="" className="w-64 h-64" />
            <div className="flex flex-col p-3 gap-1 text-center md:text-left">
              <p className="font-semibold text-lg">
                {user.first_name} {user.last_name}
              </p>
              <p>Email: {user.email}</p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <button
                  className="rounded-sm bg-red-500 px-3 py-1 block text-white"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <Link
                  className="rounded-sm bg-blue-500 px-3 py-1 block text-white"
                  to={`/user/${user.id}`}
                >
                  Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
