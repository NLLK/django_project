import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";

import ConstructorPage from "./pages/Constructor/ConstructorPage"
import LoginPage from "./pages/Account/Login/LoginPage"
import LoginSwitch from "./pages/Account/Login/LoginSwitch"
import Root from "./redux/Root"
import SignUpPage from "./pages/Account/SignUp/SignUpPage";
import SetPasswordPage from "./pages/Account/SetPassword/SetPasswordPage"
import ManagePage from "./pages/Account/Manage/ManagePage"
import SelectQuestionnairePage from "./pages/SelectQuestionnaire/SelectQuestionnairePage"
import CreateQuestionnairePage from  "./pages/SelectQuestionnaire/CreateQuestionnaire/CreateQuestionnairePage"


axios.defaults.baseURL = "http://localhost:8000";
function App() {

  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSwitch />} />
          <Route path="/account">
            <Route path="manage" element={<ManagePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="setPassword" element={<SetPasswordPage />} />
          </Route>
          <Route path="constructor" element={<ConstructorPage />} />
          <Route path="constructor/selectQuestionnaire" element={<SelectQuestionnairePage />} />
          <Route path="constructor/selectQuestionnaire/create" element={<CreateQuestionnairePage/>}/>
          <Route path="/questionnaireViewer" element={<h1>aboba</h1>} />
          <Route path="/dataAnalysis" element={<h1>abiba</h1>} />
        </Routes>
      </BrowserRouter>
    </Root>
  );
}

export default App;
