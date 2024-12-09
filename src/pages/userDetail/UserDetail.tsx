import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import { toast } from "react-toastify";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });

      if (response.status === 200) {
        console.log(response);

        toast.success("User updated successfully");
      }
    } catch (err) {
      setError("Failed to update user data.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="flex flex-col items-center gap-3 pt-3">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-80 h-80"
      />
      <h2>User Details:</h2>
      <form
        onSubmit={updateUser}
        className="flex flex-col w-full max-w-lg space-y-3"
      >
        <label>
          <Input
            placeholder="First name"
            type="text"
            value={user.first_name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev!, first_name: e.target.value }))
            }
          />
        </label>
        <label>
          <Input
            placeholder="Last name"
            type="text"
            value={user.last_name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev!, last_name: e.target.value }))
            }
          />
        </label>
        <label>
          <Input
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev!, email: e.target.value }))
            }
          />
        </label>
        <button
          type="submit"
          className="rounded-sm bg-blue-500 px-3 py-1 block text-white"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserDetail;
