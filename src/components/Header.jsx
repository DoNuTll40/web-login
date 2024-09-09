import { Alert, Typography } from "@material-tailwind/react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const dateClosePreview = sessionStorage.getItem('timePreview');
    const openPreview = sessionStorage.getItem('openPreview');
    const dateNow = new Date().toLocaleDateString('th-TH');

    setOpen(openPreview)

    // ตรวจสอบว่ามีค่าใน sessionStorage และแปลงเป็น boolean
    if (openPreview !== null) {
      setOpen(openPreview === "true");
    }

    // ตรวจสอบวันที่และรีเซ็ตถ้าเป็นวันใหม่
    if (dateNow !== dateClosePreview) {
      setOpen(true);
      sessionStorage.setItem('openPreview', "true");
    }
  }, []);

  const hdlClose = () => {
    sessionStorage.setItem('timePreview', new Date().toLocaleDateString('th-TH'));
    sessionStorage.setItem('openPreview', open ? "false" : "true");
    setOpen(!open);
  };

  return (
    <>
      <Alert
        className="rounded-none"
        color="gray"
        variant="gradient"
        open={open}
        onClose={() => hdlClose()}
        animate={{ mount: { y: 0 }, unmount: { y: -20 } }}
      >
        <Typography className="font-medium">
          ระบบนี้ทำขึ้นมาเพื่อทดสอบเท่านั้น!
        </Typography>
      </Alert>
      <Navbar />
    </>
  );
}
