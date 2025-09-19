import { IconType } from "react-icons";
import { FiHome, FiUsers, FiPaperclip } from "react-icons/fi";

type RouteSelectProps = {
  selectedPage: string;
  onSelectPage: (page: string) => void;
};

export const RouteSelect = ({ selectedPage, onSelectPage }: RouteSelectProps) => {
  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        selected={selectedPage === "Dashboard"}
        title="Dashboard"
        onClick={() => onSelectPage("Dashboard")}
      />
      <Route
        Icon={FiUsers}
        selected={selectedPage === "Bed"}
        title="Room"
        onClick={() => onSelectPage("Bed")}
      />
      <Route
        Icon={FiUsers} // Bisa ganti dengan ikon yang lebih relevan
        selected={selectedPage === "Bed2"}
        title="Room 2"
        onClick={() => onSelectPage("Bed2")} // Menggunakan nilai yang berbeda untuk bed 2
      />
      <Route
        Icon={FiPaperclip}
        selected={selectedPage === "Personel"}
        title="Personel"
        onClick={() => onSelectPage("Personel")}
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
