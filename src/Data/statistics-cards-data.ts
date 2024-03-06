import {
  ClipboardPlusIcon,
  Contact2,
  AlertTriangleIcon,
  ScanFaceIcon
} from "lucide-react"

const array: string[] = ['20','40','10','100']

export const statisticsCardsData = [
  {
    color: "green",
    icon: ClipboardPlusIcon,
    title: "Total Doctors",
    value: `${array[0]}`,
    footer: {
      color: "text-green-500",
      value: "+ 1",
      label: "doctors",
    },
  },
  {
    color: "blue",
    icon: Contact2,
    title: "Total Patients",
    value: `${array[1]}`,
    footer: {
      color: "text-green-500",
      value: "+ 3",
      label: "patients",
    },
  },
  {
    color: "red",
    icon: AlertTriangleIcon,
    title: "Incidents",
    value: `${array[2]}`,
    footer: {
      color: "text-red-500",
      value: "+ 10",
      label: "incidents",
    },
  },
  {
    color: "blue",
    icon: ScanFaceIcon,
    title: "Vitalink Total Scans",
    value: `${array[3]}`,
    footer: {
      color: "text-green-500",
      value: "+5",
      label: "successful scans",
    },
  },
];

export default statisticsCardsData;
