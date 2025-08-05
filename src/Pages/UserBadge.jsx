// components/UserBadge.jsx
import React, { useState } from "react";
import "./UserBadge.css"; // We'll style it separately

const UserBadge = ({ name, email, imageUrl }) => {
  return (
    <div className="user-badge">
      <img src={imageUrl} alt="User" className="user-image" />
    </div>
  );
};

export default UserBadge;
