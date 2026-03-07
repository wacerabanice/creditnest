import { useEffect, useState } from "react";

function Profile() {
  const [totalSimulations, setTotalSimulations] = useState(0);

  const username = localStorage.getItem("username");
  const user_id = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    const allSims = JSON.parse(localStorage.getItem("simulatorResults")) || {};
    const userSims = allSims[user_id] || [];

    setTotalSimulations(userSims.length);
  }, [user_id]);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <p><strong>Username:</strong> {username}</p>
      <p><strong>User ID:</strong> {user_id}</p>

      <div className="mt-6">
        <p><strong>Total Simulations:</strong> {totalSimulations}</p>
      </div>
    </div>
  );
}

export default Profile;