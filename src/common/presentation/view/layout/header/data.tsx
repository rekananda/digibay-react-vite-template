import { DashboardHeaderMenus } from "@/dashboard";
import { ExampledHeaderMenus } from "@/example";
import { GISHeaderMenus } from "@/gis";
import { ButtonDropdownItemT } from "@Molecule/Dropdown/ButtonDropdown";

export const headerMenus: ButtonDropdownItemT[] = [
  { label: "Sub Menu 1" },
  {
    label: "Sub Menu 2",
    childs: [
      {
        label: "Sub Menu 2.1",
        childs: [{ label: "Sub Menu 2.1.1" }, { label: "Sub Menu 2.1.2" }],
      },
      { label: "Sub Menu 2.2" },
    ],
  },
  {
    label: "Sub Menu 3",
    childs: [{ label: "Sub Menu 3.1" }, { label: "Sub Menu 3.2" }],
  },
  ...DashboardHeaderMenus,
  ...GISHeaderMenus,
  ...ExampledHeaderMenus
];

