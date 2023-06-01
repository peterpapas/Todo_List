import React, { useState } from "react";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      console.log("Passwords do not match");
      return;
    }

    const user = {
      username,
      password,
    };

    Accounts.createUser(user, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        console.log("User created successfully!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
