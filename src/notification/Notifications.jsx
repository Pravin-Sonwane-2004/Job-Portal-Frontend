import { Avatar, Button, Indicator, Popover } from "@/components/ui/system";
import {
  IconBell,
  IconBriefcaseFilled,
  IconSettings,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Helper to check if user is admin or user using jwtUtils
import { parseJwt } from "../utils/jwtUtils";

function isAdmin() {
  const token = sessionStorage.getItem("jwt");
  if (!token) return false;
  try {
    const payload = parseJwt(token);
    let roles = [];
    if (payload?.roles !== undefined) {
      roles = Array.isArray(payload.roles) ? payload.roles : [payload.roles];
    } else if (payload?.role !== undefined) {
      roles = Array.isArray(payload.role) ? payload.role : [payload.role];
    } else if (payload?.authorities !== undefined) {
      roles = Array.isArray(payload.authorities)
        ? payload.authorities
        : [payload.authorities];
    }
    return roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN");
  } catch {
    return false;
  }
}

function isUser() {
  const token = sessionStorage.getItem("jwt");
  if (!token) return false;
  try {
    const payload = parseJwt(token);
    let roles = [];
    if (payload?.roles !== undefined) {
      roles = Array.isArray(payload.roles) ? payload.roles : [payload.roles];
    } else if (payload?.role !== undefined) {
      roles = Array.isArray(payload.role) ? payload.role : [payload.role];
    } else if (payload?.authorities !== undefined) {
      roles = Array.isArray(payload.authorities)
        ? payload.authorities
        : [payload.authorities];
    }
    return roles.some((role) => role === "USER" || role === "ROLE_USER");
  } catch {
    return false;
  }
}

const Header = () => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  // Add a state to track JWT changes
  const [jwt, setJwt] = useState(sessionStorage.getItem("jwt"));
  const [userName, setUserName] = useState("");

  // Listen for JWT changes (login/logout from anywhere in the app)
  useEffect(() => {
    const onStorage = () => setJwt(sessionStorage.getItem("jwt"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Update JWT state on login/logout in this tab
  useEffect(() => {
    const interval = setInterval(() => {
      const currentJwt = sessionStorage.getItem("jwt");
      if (jwt !== currentJwt) setJwt(currentJwt);
    }, 500);
    return () => clearInterval(interval);
  }, [jwt]);

  // Fetch user name when JWT changes
  useEffect(() => {
    const fetchUserName = async () => {
      if (!jwt) {
        setUserName("");
        return;
      }
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUserName(
          res.data?.name || res.data?.username || res.data?.email || ""
        );
      } catch {
        setUserName("");
      }
    };
    fetchUserName();
  }, [jwt]);

  // Add logout handler
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  // Check if user is logged in
  const isLoggedIn = !!jwt;
  const admin = isAdmin();
  const user = isUser();

  return (
    <header className="bg-neutral-950 text-white w-full px-8 h-20 flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <div
        className="flex gap-2 items-center text-accent-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IconBriefcaseFilled className="h-10 w-10" stroke={2.5} />
        <span className="text-2xl font-bold tracking-wide">JobSearch</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-8 text-white text-lg relative">
        {/* Show All Users for admin, Find Jobs for others */}
        {admin ? (
          <NavLink
            to="/all-users"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                All Users
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        ) : (
          <NavLink
            to="/find-jobs"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Find Jobs
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
        {/* Show Find Talent for admin, Resume Builder for others */}
        {admin ? (
          <>
            <NavLink
              to="/find-talent"
              className={({ isActive }) =>
                `relative pb-2 transition-all ${
                  isActive ? "text-accent-400" : "hover:text-accent-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Find Talent
                  <span
                    className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
            {/* ...existing code for All Users removed here, now above... */}
          </>
        ) : (
          <NavLink
            to="/resume-builder"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Resume Builder
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
        {/* Only show Upload Job for admin */}
        {admin && (
          <NavLink
            to="/upload-jobs"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Upload Job
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
        {/* Only show Messaging for user */}
        {user && (
          <NavLink
            to="/my-applications"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                My Applications
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
        {/* Only show Dashboard if logged in */}
        {(admin || user) && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `relative pb-2 transition-all ${
                isActive ? "text-accent-400" : "hover:text-accent-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Dashboard
                <span
                  className={`block h-0.5 bg-accent-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </>
            )}
          </NavLink>
        )}
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-5">
        {!isLoggedIn ? (
          <Button
            variant="outline"
            color="accent"
            onClick={() => {
              navigate("/SignIn");
            }}
          >
            Log In
          </Button>
        ) : (
          <Button variant="outline" color="accent" onClick={handleLogout}>
            Logout
          </Button>
        )}

        <div className="flex items-center gap-3">
          <Avatar
            radius="xl"
            alt="Profile picture"
            src="/avatars/default.png"
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
          />
          <span className="font-medium">
            {userName ||
              (() => {
                // Try to get username from JWT if not fetched yet
                const token = sessionStorage.getItem("jwt");
                if (!token) return "User";
                try {
                  const payload = parseJwt(token);
                  return (
                    payload.name || payload.username || payload.email || "User"
                  );
                } catch {
                  return "User";
                }
              })()}
          </span>
        </div>
        <button className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-800 transition">
          <IconSettings stroke={1.5} />
        </button>

        <Popover
          opened={opened}
          onChange={setOpened}
          width={320}
          position="bottom-end"
          offset={12}
          shadow="xl"
          transitionProps={{ transition: "scale-y", duration: 200 }}
        >
          <Popover.Target>
            <button className="bg-neutral-900 p-2 rounded-full hover:bg-neutral-800 transition relative">
              <Indicator color="accent" offset={6} size={8} processing>
                <IconBell stroke={1.5} />
              </Indicator>
            </button>
          </Popover.Target>
        </Popover>
      </div>
    </header>
  );
};

export default Header;


