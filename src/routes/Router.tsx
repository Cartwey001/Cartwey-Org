import { DeleteAccount, NotFound, Privacy, Terms } from "@/pages";
import { Navigate, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/privacy-policy"} replace />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/terms-and-condition" element={<Terms />} />
      <Route path="/delete-account" element={<DeleteAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
