import React from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage, ProfilePage } from "../pages";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:userId" element={<ProfilePage />} />
    </Routes>
  );
}
