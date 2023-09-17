import React from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store"
  });
  const users: User[] = await res.json();
  const router = useRouter();
  const handleLink = () => {
    router.push("/");
  };
  return (
    <div>
      <h1 className="mb-4"> Users List</h1>
      <p>
        {" "}{new Date().toLocaleTimeString()}
      </p>
      {users.map(user =>
        <p key={user.id} className="text-red-500">
          The index of user are include: {user.id}
        </p>
      )}
      <table className="border-collapse border border-slate-500 border-spacing-3 mt-4">
        <thead className="border border-separate p-9">
          <tr>
            <th className="border border-slate-600">Name</th>
            <th className="border border-slate-600">Email</th>
          </tr>
        </thead>
        <tbody className="p-9">
          {users.map(user =>
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        className="px-2 py-3 bg-red-400 rounded-md mt-3"
        onClick={() => handleLink()}
      >
        {" "}HomePage Link
      </button>
    </div>
  );
};

export default UserPage;
