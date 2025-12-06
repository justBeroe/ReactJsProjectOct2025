import "./App.css";
import { Login } from "./app/features/auth/login/Login";
import { Register } from "./app/features/auth/register/Register";
import { Footer, Header } from "./app/shared/components";

import { Route, Routes } from 'react-router'
import { AuthProvider } from './app/core/services/AuthService';
import { Profile } from "./app/features/profile/Profile";
import { Home } from "./app/features/home/Home";
import { RadioBoard } from "./app/features/themes/radio-board/RadioBoard";

function App() {
  return (
    <>
 <AuthProvider>

     <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/radio' element={<RadioBoard />} />
            {/* <li><Link to="/songs">Deezer Songs</Link></li>
              <li><Link to="/songs2">Jamendo Songs</Link></li>
              <li><Link to="/change-song">New Deezer Artist</Link></li>
              <li><Link to="/change-song2">New Jamendo Artist</Link></li>
              <li><Link to="/artists">All Artists</Link></li>
              <li><Link to="/radio">Radio mix</Link></li> */}
      </Routes>

      <Footer />

 </AuthProvider>
    </>
  );
}

export default App;
