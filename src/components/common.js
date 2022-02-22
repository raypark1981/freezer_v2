import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Common = () => {
  const [userId, setUserId] = useState();
  const location = useLocation();

  useEffect(() => {
    setUserId(location.state.userId);
  });
};

export default Common;
