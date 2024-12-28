// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilBed,
  UilUserCircle,
  
  UilExclamationCircle,
  UilAnalytics,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilBed,
    heading: "Chambres", // Icône d'un lit pour représenter les chambres
  },
  {
    icon: UilUserCircle,
    heading: "Résidents", // Icône représentant les résidents (personnes)
  },
  {
    icon: UilMoneyWithdrawal,
    heading: "Paiement en retard", // Icône pour symboliser des paiements
  },
  {
    icon: UilExclamationCircle,
    heading: "Incident en cours", // Icône d'avertissement pour les incidents
  },
  {
    icon: UilAnalytics,
    heading: "Statistiques", // Icône pour les analyses et graphiques
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Taux occupation",
    color: {
      backGround: "linear-gradient(180deg,rgb(19, 250, 108) 0%,rgb(132, 243, 169) 100%)",
      boxShadow: "0px 10px 20px 0px rgb(203, 245, 198)",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Chambres disponibles",
    color: {
      backGround: "linear-gradient(180deg,rgb(147, 145, 255) 0%,rgb(146, 148, 252) 100%)",
      boxShadow: "0px 10px 20px 0px rgb(192, 203, 253)",
    },
    barValue: 34,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Cpacité d'heberegement",
    color: {
      backGround:
        "linear-gradient(rgb(252, 96, 24) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px rgb(249, 155, 155)",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
