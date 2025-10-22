import {
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../all services/getJfBackendService";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.trimStart(), // prevent leading spaces
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(REGISTER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role,
          }),
        });

        const message = await response.text();

        if (response.ok) {
          setSuccess("Account created successfully! Redirecting to sign-in...");
          setTimeout(() => navigate("/signin"), 1500);
        } else {
          if (message.toLowerCase().includes("email already exists")) {
            setError("Email already exists.");
          } else {
            setError(message || "Error creating account.");
          }
        }
      } catch {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    },
    [form, navigate]
  );

  return (
    <div className="h-screen flex items-center justify-center bg-masala-950 px-2">
      <div className="w-full max-w-xl bg-masala-950 border border-bright-sun-300 shadow-md rounded-xl p-6">
        <Title
          align="center"
          order={2}
          className="text-bright-sun-500 font-semibold mb-4"
        >
          Register
        </Title>

        {error && (
          <Text color="red" align="center" size="sm" className="mb-2">
            {error}
          </Text>
        )}
        {success && (
          <Text color="green" align="center" size="sm" className="mb-2">
            {success}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              icon={<IconUser size={16} />}
              label="Name"
              name="name"
              size="sm"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
            />

            <TextInput
              icon={<IconMail size={16} />}
              label="Email"
              name="email"
              size="sm"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="e.g. john@example.com"
            />

            <PasswordInput
              icon={<IconLock size={16} />}
              label="Password"
              name="password"
              size="sm"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Choose a secure password"
            />

            <PasswordInput
              icon={<IconLock size={16} />}
              label="Confirm Password"
              name="confirmPassword"
              size="sm"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter your password"
            />

            <div>
              <Text size="sm" className="mb-1 text-white font-medium">
                Role
              </Text>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 text-sm rounded border border-masala-500 bg-masala-900 text-white"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="RECRUITER">Recruiter</option>
              </select>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="md"
              styles={{
                root: {
                  backgroundColor: "#f99b07",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  "&:hover": { backgroundColor: "#dd7302" },
                },
              }}
            >
              Register Account
            </Button>
          </Stack>

          <Text align="center" size="sm" mt="md" className="text-masala-300">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-bright-sun-400 hover:underline focus:outline-none"
            >
              Log In
            </button>
          </Text>
        </form>
      </div>
    </div>
  );
}
