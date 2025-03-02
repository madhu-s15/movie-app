import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div
      id="heading"
      className="absolute w-full bg-gradient-to-b from-black py-8 px-4 z-30 flex justify-between"
    >
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt=""
      />
      {user && (
        <div>
          <div className="flex">
            <p className="font-bold text-white m-6">
              Welcome {user.displayName}!
            </p>
            <img
              className="m-2 w-12 h-12"
              src="https://occ-0-5452-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
              alt=""
            />

            <button className="font-bold text-white" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
