import { Alert, Button, Input } from "@material-tailwind/react";
import axios from "../configs/axios";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Turnstile } from '@marsidev/react-turnstile'
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const [tokenMain, setTokenMain] = useState("");

  const hdlCheckToken = (token) => {
    if (token) {
      setTokenMain(token);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "" || email.trim() === "" || phone.trim() === "") {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (!tokenMain) {
      return alert("รอระบบตรวจสอบ");
    }

    const loadingToast = toast.loading('กำลังโหลด...');

    try {
      const response = await axios.post("/auth/sign-up", {
        user_username: username,
        user_password: password,
        user_email: email,
        confirmPassword,
        user_phone: phone,
      }, {
        withCredentials: true,
      });

      if(response.status === 200){
        toast.update(loadingToast, {
          render: 'สมัครสมาชิกสำเร็จ',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
          onClose: () => {
            navigate('/');
          }
        });
      }

    } catch (err) {
      toast.update(loadingToast, {
        render: 'ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      console.log(err);
      setError(err.response.data.result);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[350px] sm:w-[400px] md:w-[420px] flex justify-between flex-col p-4 sm:p-6 rounded-md shadow-md select-none min-h-[450px]">
        <div>
          <h2 className="text-xl mb-2 font-bold text-center sm:text-left">สมัครสมาชิก</h2>
          <p className={`${error ? "mb-4" : "mb-6"} h-5 text-center sm:text-left`}>กรุณากรอกข้อมูลให้ครบ</p>
          <Alert
            open={error !== ""}
            onClose={() => setError("")}
            icon={<FontAwesomeIcon icon={faCircleInfo} />}
            variant="outlined"
            color="red"
            className="mb-4 flex items-center rounded-md"
            animate={{
              mount: { x: 0 },
              unmount: { x: 20 },
            }}>
            {error}
          </Alert>
          <div className="mb-4">
            <Input
              type="text"
              id="username"
              label="ชื่อผู้ใช้งาน"
              placeholder="ชื่อผู้ใช้งาน"
              size="lg"
              value={username}
              onFocus={() => setError("")}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <Input
              type={viewPassword ? "password" : "text"}
              id="password"
              size="lg"
              icon={
                <FontAwesomeIcon
                  className="opacity-50 hover:opacity-100 cursor-pointer transition-all duration-100 ease-in-out"
                  icon={viewPassword ? faEye : faEyeSlash}
                  onClick={() => setViewPassword((prev) => !prev)} />
              }
              label="รหัสผ่าน"
              placeholder="รหัสผ่าน"
              value={password}
              onFocus={() => setError("")}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required />
          </div>
          <div className="mb-4">
            <Input
              type={viewConfirmPassword ? "password" : "text"}
              id="confirmPassword"
              size="lg"
              icon={
                <FontAwesomeIcon
                  className="opacity-50 hover:opacity-100 cursor-pointer transition-all duration-100 ease-in-out"
                  icon={viewConfirmPassword ? faEye : faEyeSlash}
                  onClick={() => setViewConfirmPassword((prev) => !prev)} />
              }
              label="ยืนยันรหัสผ่าน"
              placeholder="ยืนยันรหัสผ่าน"
              value={confirmPassword}
              onFocus={() => setError("")}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              required />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              id="email"
              label="อีเมล"
              placeholder="อีเมล"
              size="lg"
              value={email}
              onFocus={() => setError("")}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              id="phone"
              label="หมายเลขโทรศัพท์"
              placeholder="หมายเลขโทรศัพท์"
              size="lg"
              value={phone}
              onFocus={() => setError("")}
              onChange={(e) => setPhone(e.target.value)}
              required />
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <hr className="mt-4 mb-1" />
          <Turnstile className="mx-auto"
            siteKey="0x4AAAAAAAjDn7DyUTfoZ4vK"
            onSuccess={(token) => hdlCheckToken(token)}
            size="compact"
          />
          <hr className="mb-4 mt-1" />
          <Button type="submit" className="w-full bg-blue-900" size="md">
            สมัครสมาชิก
          </Button>
          <Button onClick={() => navigate('/login')} className="w-full bg-blue-900" size="md">
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
          </Button>
        </div>
      </form>
    </div>
  );
}
