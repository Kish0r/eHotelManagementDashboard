"use client";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { useEffect } from "react";

const AdminPage = () => {
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      window.location.href = '/sign-in'
    }
  })
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <p>WELCOME TO E-HOTEL MANAGEMENT DASHBOARD</p>
    </div>
  );
};

export default AdminPage;
