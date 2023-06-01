import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";
import { useHistory } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("123");
  const [password, setPassword] = useState("123456");
  const history = useHistory();

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 1) {
      alert("Please enter a username");
      return;
    }

    if (password.length < 6) {
      alert("Please enter a password that is at least 6 characters long");
      return;
    }

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <input
        className="w-full p-2 mb-4 rounded-md border border-gray-300"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full p-2 mb-4 rounded-md border border-gray-300"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full p-2 mb-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
        type="submit"
      >
        Login
      </button>
      <button
        className="w-full p-2 mb-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-700"
        type="button"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </form>
  );
};
