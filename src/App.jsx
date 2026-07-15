import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import LoginLanding from "./pages/LoginLanding"
import Layout from "./Pages/Layout"
import Dashboard from "./Pages/Dashboard"
import Employess from "./Pages/Employees"
import Attendance from "./Pages/attendance"
import Leave from "./pages/Leave"
import Payslips from "./Pages/payslips"
import Settings from "./Pages/Settings"
import PrintPayslips from "./Pages/printpayslips"
import LoginForm from "./components/LoginForm"

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />

        <Route path="/login/admin" element={<LoginForm role ="admin"title ="Admin Portal" subtitle = "Sign in to manage the organization"/>} />

        <Route path="/login/employee" element={<LoginForm role ="employee" title ="Employee Portal" subtitle ="Sign in to access your account" />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employess />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print/payslips/:id" element={<PrintPayslips />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )

}
export default App