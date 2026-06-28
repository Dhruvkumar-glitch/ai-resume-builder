import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuth, UserButton, useUser } from "@clerk/react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to={"/"}>
        <img src="/logo.png" alt="logo" width={50} />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ size: "lg" })} to={"/dashboard"}>
            Dashboard
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link className={buttonVariants({ size: "lg" })} to={"/auth/sign-in"}>
          Get Started!
        </Link>
      )}
    </div>
  );
};

export default Header;
