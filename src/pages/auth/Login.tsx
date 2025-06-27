import { useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { AuroraBackground } from "../../components/ui/aurora-background";
import { useAdminLogin } from "../../hooks/useAdminAuth";
import { message } from "antd";

const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useAdminLogin();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(null);

    const key = "loginToast";
    message.loading({ content: "Logging in...", key });

    loginMutation.mutate(
      { name: user, password },
      {
        onSuccess: () => {
          message.success({ content: "Login successful!", key, duration: 2 });
          navigate("/admin");
        },
        onError: (err: Error) => {
          message.error({
            content: err.message || "Login failed",
            key,
            duration: 2,
          });
          setError(err.message);
          console.log(err);
          
        },
      }
    );
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="!p-8 w-[420px] h-[350px] rounded-2xl border bg-[#fefeff] shadow-lg flex flex-col justify-center gap-[40px]">
            <h2 className="text-3xl font-bold text-center text-[#18181b] mb-4">
              Ameen group Login
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                type="user"
                placeholder="Enter user..."
                className="rounded-[10px] !p-2 text-[#18181b]"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  className="rounded-[10px] !p-2 text-[#18181b]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </span>
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[#151518] hover:bg-[#18181b] text-white font-semibold p-2 rounded-xl transition duration-200 cursor-pointer"
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Login;
