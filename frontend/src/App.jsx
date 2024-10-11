import DiaryPage from "pages/Diary/Diary";
import { Route, Routes } from "react-router-dom";


export const App = () => {
  return (
    <Routes>
        <Route path="/diary" element={<DiaryPage />} />
    </Routes>
  );
};