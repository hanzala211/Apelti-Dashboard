import { SettingSidebarItem } from "./SettingSidebarItem";
import { ICONS, ROUTES } from "@constants";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const SettingSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sideBarButtonRef = useRef<HTMLButtonElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node) &&
        sideBarButtonRef.current &&
        !sideBarButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const sidebarItems = [
    {
      label: "Account Settings",
      links: [
        { link: `${ROUTES.settings}/${ROUTES.profile}`, value: "Profile" },
        { link: `/`, value: "Email Preference" },
        { link: `/`, value: "Security" },
      ],
      isBorderBottom: true,
    },
    {
      label: "Accounting",
      links: [
        { link: `/`, value: "Preferences" },
        { link: `/`, value: "Classifications" },
        { link: `/`, value: "Terms of Payment" },
      ],
      isBorderBottom: false,
    },
    {
      label: "Integration",
      links: [
        { link: `/`, value: "Preferences" },
        {
          link: `${ROUTES.settings}/${ROUTES.export_configuration}`,
          value: "Export Configuration",
        },
        {
          link: `${ROUTES.settings}/${ROUTES.define_rules}`,
          value: "Define Invoice Rules",
        },
        {
          link: `${ROUTES.settings}/${ROUTES.import_dataset}`,
          value: "Import Dataset",
        },
      ],
      isBorderBottom: true,
    },
    {
      label: "Bank and Payments",
      links: [],
      isBorderBottom: false,
    },
    {
      label: "Plan & Payment",
      links: [],
      isBorderBottom: false,
    },
    {
      label: "Company profile",
      links: [],
      isBorderBottom: false,
    },
    {
      label: "Users & Roles",
      links: [
        { link: `/`, value: "Users" },
        { link: `/`, value: "Roles" },
      ],
      isBorderBottom: false,
    },
  ];

  return (
    <>
      <button
        ref={sideBarButtonRef}
        className={`md:hidden fixed top-3 sm:left-0 -left-1 p-3 h-fit bg-transparent rounded-md z-50 transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ICONS.menu size={20} />
      </button>
      <aside
        ref={sideBarRef}
        className={`fixed md:relative h-[100dvh] z-50 bg-basicWhite w-64 flex flex-col transition-transform duration-300 md:translate-x-0 md:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-3 py-5 border-b-[1px]">
          <Link to="/" className="flex items-center gap-1 text-[24px]">
            <ICONS.leftArrowSlider size={32} /> Exit
          </Link>
        </div>
        <div>
          <div className="py-[18px]">
            <SettingSidebarItem data={sidebarItems[0]} />
          </div>
          <div>
            <SettingSidebarItem data={sidebarItems[1]} />
            <SettingSidebarItem data={sidebarItems[2]} />
          </div>
          <div className="py-5">
            <SettingSidebarItem data={sidebarItems[3]} />
            <SettingSidebarItem data={sidebarItems[4]} />
            <SettingSidebarItem data={sidebarItems[5]} />
            <SettingSidebarItem data={sidebarItems[6]} />
          </div>
        </div>
      </aside>
    </>
  );
};
