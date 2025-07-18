import { useEffect, useCallback, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

// 🔒 Admin Panel: Manage Users
export const AdminUsers = () => {
    // 🧠 Local State to store all users
    const [users, setUsers] = useState([]);
    const { authorizationToken, user } = useAuth(); // 🔐 Auth token & user from store

    // 📡 API CALL: Fetch all users
    const getAllUsersData = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await response.json();
            setUsers(data); // 📥 Save response in state
        } catch (error) {
            console.log("Error fetching users:", error);
        }
    }, [authorizationToken]);

    // ❌ Delete user by ID with confirmation
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            },
        });

        const data = await response.json();
        console.log(`users after delete ${data}`);

        // 🔄 Refresh data after deletion
        if (response.ok) {
            getAllUsersData();
        }
    };

    // 🚀 Fetch users on component mount
    useEffect(() => {
        getAllUsersData();
    }, [getAllUsersData]);

    return (
        <section className="min-h-screen overflow-y-auto bg-transparent px-2 sm:px-4 pb-6">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-xl text-center sm:text-2xl font-bold text-gray-800 mt-4 mb-4">
                    Admin Users Data
                </h1>

                {/* 🖥️ Desktop Table View */}
                <div className="hidden md:block max-h-[75vh] rounded-lg shadow-lg bg-white overflow-auto">
                    <table className="min-w-full text-sm md:text-base border-separate border-spacing-y-4">
                        <thead className="bg-indigo-600 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2 text-left uppercase tracking-wide">Name</th>
                                <th className="px-4 py-2 text-left uppercase tracking-wide">Email</th>
                                <th className="px-4 py-2 text-left uppercase tracking-wide">Phone</th>
                                <th className="px-4 py-2 text-left uppercase tracking-wide">Update</th>
                                <th className="px-4 py-2 text-left uppercase tracking-wide">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {
                                const isCurrentAdmin = curUser._id === user._id;

                                return (
                                    <tr
                                        key={index}
                                        className="bg-gray-50 hover:bg-gray-100 rounded-md transition"
                                    >
                                        <td className="px-4 py-2">{curUser.username}</td>
                                        <td className="px-4 py-2">{curUser.email}</td>
                                        <td className="px-4 py-2">{curUser.phone}</td>
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/admin/users/${curUser._id}/edit`}
                                                className="bg-green-200 text-green-600 hover:text-white px-6 md:px-10 py-2 rounded-full hover:bg-green-500 transition shadow-md"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => deleteUser(curUser._id)}
                                                disabled={isCurrentAdmin}
                                                className={`${isCurrentAdmin
                                                    ? "bg-gray-300 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-indigo-700"
                                                    } text-white px-6 py-2 rounded-full transition shadow-md`}
                                            >
                                                {isCurrentAdmin ? "Can't Delete" : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 📱 Mobile Card View */}
                <div className="md:hidden space-y-4 mt-4">
                    {users.map((curUser, index) => {
                        const isCurrentAdmin = curUser._id === user._id;

                        return (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 space-y-2"
                            >
                                <p>
                                    <span className="font-semibold">Name:</span> {curUser.username}
                                </p>
                                <p>
                                    <span className="font-semibold">Email:</span> {curUser.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span> {curUser.phone}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-2 justify-between pt-2">
                                    <Link
                                        to={`/admin/users/${curUser._id}/edit`}
                                        className="bg-green-200 text-green-600 hover:text-white text-center px-6 py-2 rounded-full hover:bg-green-500 transition shadow"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteUser(curUser._id)}
                                        disabled={isCurrentAdmin}
                                        className={`${isCurrentAdmin
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-700 to-purple-700 hover:bg-indigo-700"
                                            } text-white px-6 py-2 rounded-full transition shadow`}
                                    >
                                        {isCurrentAdmin ? "Can't Delete" : "Delete"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
