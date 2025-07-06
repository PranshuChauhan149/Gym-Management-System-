import { IoPeopleSharp } from "react-icons/io5";
import { MdCalendarMonth, MdAccessTime } from "react-icons/md";
import { FaUserTimes, FaRegCalendarTimes } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";

export const DetailsInfo = [
  {
    title: "Joined Members",
    icon: IoPeopleSharp,
    color: "text-orange-500",
    bgColor: "bg-gradient-to-r from-orange-400 to-yellow-400",
    path:"/Joined-members"
  },
  {
    title: "Monthly Joined",
    icon: MdCalendarMonth,
    color: "text-blue-500",
    bgColor: "bg-gradient-to-r from-blue-400 to-cyan-400",
     path:"/monthly-Joined"
  },
  {
    title: "Expiring within 3 Days",
    icon: MdAccessTime,
    color: "text-red-500",
    bgColor: "bg-gradient-to-r from-red-400 to-pink-400",
    path:"/expiring-in-3-days"
  },
  {
    title: "Expiring in 4-7 Days",
    icon: FaRegCalendarTimes,
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-r from-yellow-400 to-orange-300",
    path:"/expiring-in-4-to-7-days"
  },
  {
    title: "Expired Members",
    icon: FaUserTimes,
    color: "text-gray-600",
    bgColor: "bg-gradient-to-r from-gray-500 to-gray-400",
    path:"/expired-members"
  },
  {
    title: "Remove Members",
    icon: RiDeleteBack2Fill,
    color: "text-red-800",
    bgColor: "bg-gradient-to-r from-red-500 to-red-400",
    path:"/inactive-members"
  },
];


const dummyUsers = [
  {
    phone: "9876543210",
    address: "123 Main Street, Delhi",
    image: "",
    membership: {
      plan: "3 Months",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-01"),
      paidAmount: 3000,
      isActive: true,
      paymentMode: "cash"
    }
  },
  {
    phone: "9123456789",
    address: "45 MG Road, Mumbai",
    image: "",
    membership: {
      plan: "1 Month",
      startDate: new Date("2024-06-15"),
      endDate: new Date("2024-07-15"),
      paidAmount: 1200,
      isActive: true,
      paymentMode: "upi"
    }
  },
  {
    phone: "9988776655",
    address: "Sector 21, Noida",
    image: "",
    membership: {
      plan: "6 Months",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-07-01"),
      paidAmount: 6000,
      isActive: false,
      paymentMode: "card"
    }
  },
  {
    phone: "9090909090",
    address: "Park Street, Kolkata",
    image: "",
    membership: {
      plan: "12 Months",
      startDate: new Date("2023-07-01"),
      endDate: new Date("2024-07-01"),
      paidAmount: 12000,
      isActive: false,
      paymentMode: "cash"
    }
  }
];

export default dummyUsers;
