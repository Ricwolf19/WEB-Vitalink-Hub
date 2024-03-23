import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import {
  ArrowUpIcon,
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../Components/Dashboard/Cards/statistics-card";
import { StatisticsChart } from "../../Components/Dashboard/Charts/statistics-chart";
import {
  projectsTableData,
} from "../../Data";

import { AlertTriangleIcon, ClipboardPlusIcon, Contact2, ScanFaceIcon, Users } from "lucide-react";
import { useDoctorData, usePatientData } from "../../Context/authContext";
import { chartsConfig } from "../../Configs";

export function Home() {
  const { patientData, alerts, vitalinkScans, statusChartPatient, lastPatientLastName, lastPatientName } = usePatientData()
  const { doctorData, statusChartDoctor, lastDoctorName, lastDoctorLastName } = useDoctorData()

  const crowdedArea = () => {
    let arrFinal = []

    let countSurgeryD = 0
    let countEmergencyD = 0
    let countIntensiveD = 0
    let countPediatricD = 0
    let countMaternityD = 0
    let countOrthopedicD = 0
    let countOncologyD = 0
    let countCardiologyD = 0
    let countNeurologyD = 0
    let countPsychiatricD = 0
    let countRadiologyD = 0
    let countLaboratoryD = 0

    let countSurgeryP = 0
    let countEmergencyP = 0
    let countIntensiveP = 0
    let countPediatricP = 0
    let countMaternityP = 0
    let countOrthopedicP = 0
    let countOncologyP = 0
    let countCardiologyP = 0
    let countNeurologyP = 0
    let countPsychiatricP = 0
    let countRadiologyP = 0
    let countLaboratoryP = 0


    for (let i = 0; i < doctorData.length; i++) {
      switch (doctorData[i].area) {
        case 'Surgery Area':
          countSurgeryD++
          break;
        case 'Emergency Room':
          countEmergencyD++
          break;
        case 'Intensive Care Unit':
          countIntensiveD++
          break;
        case 'Pediatric Ward':
          countPediatricD++
          break;
        case 'Maternity Ward':
          countMaternityD++
          break;
        case 'Orthopedic Ward':
          countOrthopedicD++
          break;
        case 'Oncology Ward':
          countOncologyD++
          break;
        case 'Cardiology Department':
          countCardiologyD++
          break;
        case 'Neurology Department':
          countNeurologyD++
          break;
        case 'Psychiatric Ward':
          countPsychiatricD++
          break;
        case 'Radiology Department':
          countRadiologyD++
          break;
        case 'Laboratory':
          countLaboratoryD++
          break;
        default:
          break;
      }
    }

    for (let i = 0; i < patientData.length; i++) {
      switch (patientData[i].area) {
        case 'Surgery Area':
          countSurgeryP++
          break;
        case 'Emergency Room':
          countEmergencyP++
          break;
        case 'Intensive Care Unit':
          countIntensiveP++
          break;
        case 'Pediatric Ward':
          countPediatricP++
          break;
        case 'Maternity Ward':
          countMaternityP++
          break;
        case 'Orthopedic Ward':
          countOrthopedicP++
          break;
        case 'Oncology Ward':
          countOncologyP++
          break;
        case 'Cardiology Department':
          countCardiologyP++
          break;
        case 'Neurology Department':
          countNeurologyP++
          break;
        case 'Psychiatric Ward':
          countPsychiatricP++
          break;
        case 'Radiology Department':
          countRadiologyP++
          break;
        case 'Laboratory':
          countLaboratoryP++
          break;
        default:
          break;
      }
    }

    let countTotalSurgery = countSurgeryD + countSurgeryP
    let countTotalEmergency = countEmergencyD + countEmergencyP
    let countTotalIntensive = countIntensiveD + countIntensiveP
    let countTotalPediatric = countPediatricD + countPediatricP
    let countTotalMaternity = countMaternityD + countMaternityP
    let countTotalOrthopedic = countOrthopedicD + countOrthopedicP
    let countTotalOncology = countOncologyD + countOncologyP
    let countTotalCardiology = countCardiologyD + countCardiologyP
    let countTotalNeurology = countNeurologyD + countNeurologyP
    let countTotalPsychiatric = countPsychiatricD + countPsychiatricP
    let countTotalRadiology = countRadiologyD + countRadiologyP
    let countTotalLaboratory = countLaboratoryD + countLaboratoryP

    arrFinal = [
      countTotalSurgery,
      countTotalEmergency,
      countTotalIntensive,
      countTotalPediatric,
      countTotalMaternity,
      countTotalOrthopedic,
      countTotalOncology,
      countTotalCardiology,
      countTotalNeurology,
      countTotalPsychiatric,
      countTotalRadiology,
      countTotalLaboratory
    ]
    return arrFinal
  }

  const statusPatientsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: statusChartPatient(),
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#FF9900",
      plotOptions: {
        bar: {
          columnWidth: "75%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Stable", "Unstable", "Improving", "Critical", "Recovering", "Serious", "Guarded"],
      },
    },
  };

  const crowdedAreasChart = {
    type: 'area',
    height: 220,
    series: [
      {
        name: 'Personal in area',
        data: crowdedArea(),
      },
    ],
    options: {
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          'Surgery',
          'Emergency',
          'Intensive',
          'Pediatric',
          'Maternity',
          'Orthopedic',
          'Oncology',
          'Cardiology',
          'Neurology',
          'Psychiatric',
          'Radiology',
          'Laboratory',
        ]
      },
    },
  };


  const statusDoctorChartConf = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: statusChartDoctor(),
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#cc0000"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ['On Call', 'Away', 'Available', 'Not Available'],
      },
    },
  };
  const statusDoctorChart = {
    ...statusDoctorChartConf,
    series: [
      {
        name: "Doctor Status",
        data: statusChartDoctor(),
      },
    ],
  };


  const statisticsChartsData = [
    {
      color: "white",
      title: "Patients Status",
      description: "@vitalink",
      chart: statusPatientsChart,
    },
    {
      color: "white",
      title: "Crowded Areas",
      description: "@vitalink",
      chart: crowdedAreasChart,
    },
    {
      color: "white",
      title: "Doctors Status",
      description: "@vitalink",
      chart: statusDoctorChart,

    },
  ];


  const statisticsCardsData = [
    {
      color: "green",
      icon: ClipboardPlusIcon,
      title: "Total Doctors",
      value: `${doctorData.length}`,
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
      value: `${patientData.length}`,
      footer: {
        color: "text-green-500",
        value: "+ 3",
        label: "patients",
      },
    },
    {
      color: "red",
      icon: AlertTriangleIcon,
      title: "Critical Patients",
      value: `${alerts()}`,
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
      value: `${vitalinkScans()}`,
      footer: {
        color: "text-green-500",
        value: "+5",
        label: "successful scans",
      },
    },
  ];


  const ordersOverviewData = [
    {
      icon: BellIcon,
      color: "text-blue-gray-300",
      title: `Last Patient: ${lastPatientName} ${lastPatientLastName}`,
      description: "22 DEC 7:20 PM",
    },
    {
      icon: PlusCircleIcon,
      color: "text-blue-gray-300",
      title: `Last Doctor: ${lastDoctorName} ${lastDoctorLastName}`,
      description: "21 DEC 11 PM",
    },
    {
      icon: ShoppingCartIcon,
      color: "text-blue-gray-300",
      title: "Server payments for April",
      description: "21 DEC 9:34 PM",
    },
    {
      icon: CreditCardIcon,
      color: "text-blue-gray-300",
      title: "New card added for order #4395133",
      description: "20 DEC 2:20 AM",
    },
    {
      icon: LockOpenIcon,
      color: "text-blue-gray-300",
      title: "Unlock packages for development",
      description: "18 DEC 4:54 AM",
    },
    {
      icon: BanknotesIcon,
      color: "text-blue-gray-300",
      title: "New order #9583120",
      description: "17 DEC",
    },
  ];


  return (
    <div className="mt-12">
      <div className="mb-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard //Puesto como any por si da error
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography placeholder="" className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart //Puesto como any por si da error
            key={props.title}
            {...props}
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card placeholder="" className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            placeholder=""
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>

              <Typography placeholder="" variant="h6" color="blue-gray" className="mb-1">
                <Users strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                {`Patients`}
              </Typography>
            </div>

          </CardHeader>
          <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Status", "Area", "Chronic Diseases", "Allergies", "Blood Type", "Birth Date", "Age", "Doctor Assigned"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          placeholder=""
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {patientData.map(
                  ({ age, allergies, area, birthDate, bloodType, chronicDiseases, lastName, name, status, doctorAssigned, id }: any, key: any) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50 text-center"
                      }`;

                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="text-center">
                            <Avatar placeholder="" src={"https://i.ibb.co/k1v2vgn/pacient-icon.jpg"} alt={name} size="sm" className="text-center" />
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-bold text-center"
                            >
                              {name}
                            </Typography>

                          </div>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="font-bold text-center text-blue-gray-600 text-xs"
                          >
                            {lastName}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {area}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {" " + chronicDiseases}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {" " + allergies}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {bloodType}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {birthDate}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {age}

                            <Progress
                              placeholder=""
                              value={age}
                              variant="gradient"
                              color="green"
                              className="h-1 mt-2"
                            />
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {doctorAssigned}

                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card placeholder="" className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            placeholder=""
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography placeholder="" variant="h6" color="blue-gray" className="mb-2">
              Last important
            </Typography>
            <Typography
              placeholder=""
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>information</strong>
            </Typography>
          </CardHeader>
          <CardBody placeholder="" className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                      ? "after:h-0"
                      : "after:h-4/6"
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      placeholder=""
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      placeholder=""
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
