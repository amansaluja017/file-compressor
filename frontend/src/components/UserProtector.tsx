import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/Store";
import { useNavigate } from "react-router";

function UserProtector({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication?: boolean;
}) {
  const navigate = useNavigate();

  const typedUseSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
  const status = typedUseSelectorHook((state) => state.user.status);

  useEffect(() => {
    if (authentication && status !== authentication) {
      navigate("/");
    } else if (!authentication && status !== authentication) {
      navigate("/home");
    }
  }, [authentication, navigate, status]);

  return <div>{children}</div>;
}

export default UserProtector;
