import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/",
      },
      {
        icon: "/sort.png",
        label: "Rooms",
        href: "/modules/room",
      },
      {
        icon: "/filter.png",
        label: "Bookings",
        href: "/modules/booking",
      },
      {
        icon: "/phone.png",
        label: "Complaints",
        href: "/modules/complaints",
      },
      {
        icon: "/profile.png",
        label: "Customers",
        href: "/modules/customer",
      },
      {
        icon: "/finance.png",
        label: "Payments",
        href: "/modules/payment",
      }
    ],
  }
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
