import "./App.css";
import { Login } from "./app/features/auth/login/Login";
import { Register } from "./app/features/auth/register/Register";
import { Footer, Header } from "./app/shared/components";

import { Route, Routes } from 'react-router'
import { AuthProvider } from './app/core/services/AuthService';
import { Profile } from "./app/features/profile/Profile";
import { Home } from "./app/features/home/Home";
import { RadioBoard } from "./app/features/themes/radio-board/RadioBoard";
import { ThemeBoard } from "./app/features/themes/theme-board/ThemeBoard";
import { ThemeBoard2 } from "./app/features/themes/song2-board/ThemeBoard2";
import { NewTheme } from "./app/features/themes/new-theme/NewTheme";
import { NewTheme2 } from "./app/features/themes/new-song2/NewTheme2";
import { ArtistBoard } from "./app/features/themes/artist-board/ArtistBoard";
import { NotFound } from "./app/shared/components/not-found/NotFound";

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
        <Route path='/songs' element={<ThemeBoard />} />
        {/* <Route path='/songs2' element={<ThemeBoard2 />} /> */}
        <Route path='/change-song' element={<NewTheme />} />
        <Route path='/change-song2' element={<NewTheme2 />} />
         {/* ✅ Route for songs by artistId */}
        <Route path="/songs/:artistId" element={<ThemeBoard/>} />
        <Route path="/songs2" element={<ThemeBoard2/>} />
        <Route path="/songs2/:artistId" element={<ThemeBoard2/>} />
        <Route path="/artists" element={<ArtistBoard />} />
        <Route path="*" element={<NotFound />} />

          
      </Routes>

      <Footer />

 </AuthProvider>
    </>
  );
}

export default App;
