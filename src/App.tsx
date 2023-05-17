// import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Homepage from "./Pages/Homepage";
import Navigation from "./Components/Navigation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Create from './Pages/Create';

export type UserData = {
  username: string
  password: string
}

export type Workout = {
  category: string
  createdAt: string
  load: number
  reps: number
  sets: number
  title: string
  unit: string
  updatedAt: string
  userId: string
  __v: number
  _id: string
}

export type WorkoutData = {
  title: string
  category: string
  unit: string
  load: number
  sets: number
  reps: number
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ?
        <>
          <Navigation />
          <Container>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<Navigate to='/' />} />
            </Routes>
          </Container>
        </>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      }
    </>
  )
};

export default App;
