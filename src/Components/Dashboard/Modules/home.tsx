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
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../../Components/Dashboard/Cards/statistics-card";
import { StatisticsChart } from "../../../Components/Dashboard/Charts/statistics-chart";


import { AlertTriangleIcon, ClipboardPlusIcon, Contact2, PlusCircle, ScanFaceIcon, Users } from "lucide-react";
import { useDoctorData, usePatientData } from "../../../Context/authContext";
import { chartsConfig } from "../../../Configs";
import { MdBloodtype } from "react-icons/md";
import { TbMoodBoy } from "react-icons/tb";
import { SlPeople } from "react-icons/sl";
import { useTranslation } from "react-i18next";

export function Home() {
  const { patientData, alerts, vitalinkScans, statusChartPatient, lastPatientLastName, lastPatientName, getElderlyPatients, getUnderAgePatients, getMostCommonBloodType } = usePatientData()
  const { doctorData, statusChartDoctor, lastDoctorName, lastDoctorLastName } = useDoctorData()

  const [t] = useTranslation("global")

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
        name: t("d-home.charts.1.series"),
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
        categories: [
          t("d-home.charts.1.item1"),
          t("d-home.charts.1.item2"),
          t("d-home.charts.1.item3"),
          t("d-home.charts.1.item4"),
          t("d-home.charts.1.item5"),
          t("d-home.charts.1.item6"),
          t("d-home.charts.1.item7")
        ],
      },
    },
  };

  const crowdedAreasChart = {
    type: 'area',
    height: 220,
    series: [
      {
        name: t("d-home.charts.2.series"),
        data: crowdedArea(),
      },
    ],
    options: {
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          t("d-home.charts.2.item1"),
          t("d-home.charts.2.item2"),
          t("d-home.charts.2.item3"),
          t("d-home.charts.2.item4"),
          t("d-home.charts.2.item5"),
          t("d-home.charts.2.item6"),
          t("d-home.charts.2.item7"),
          t("d-home.charts.2.item8"),
          t("d-home.charts.2.item9"),
          t("d-home.charts.2.item10"),
          t("d-home.charts.2.item11"),
          t("d-home.charts.2.item12")
        ]
      },
    },
  };


  const statusDoctorChartConf = {
    type: "line",
    height: 220,
    series: [
      {
        name:  t("d-home.charts.3.series"),
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
        categories: [
          t("d-home.charts.3.item1"),
          t("d-home.charts.3.item2"),
          t("d-home.charts.3.item3"),
          t("d-home.charts.3.item4")
        ],
      },
    },
  };
  const statusDoctorChart = {
    ...statusDoctorChartConf,
    series: [
      {
        name: t("d-home.charts.3.series"),
        data: statusChartDoctor(),
      },
    ],
  };


  const statisticsChartsData = [
    {
      color: "white",
      title: t("d-home.charts.1.series"),
      description: "@vitalink",
      chart: statusPatientsChart,
    },
    {
      color: "white",
      title: t("d-home.charts.2.series"),
      description: "@vitalink",
      chart: crowdedAreasChart,
    },
    {
      color: "white",
      title: t("d-home.charts.3.series"),
      description: "@vitalink",
      chart: statusDoctorChart,

    },
  ];


  const statisticsCardsData = [
    {
      color: "green",
      icon: ClipboardPlusIcon,
      title: t("d-home.cards.item1"),
      value: `${doctorData.length}`,    
    },
    {
      color: "blue",
      icon: Contact2,
      title: t("d-home.cards.item2"),
      value: `${patientData.length}`,   
    },
    {
      color: "red",
      icon: AlertTriangleIcon,
      title: t("d-home.cards.item3"),
      value: `${alerts()}`,     
    },
    {
      color: "blue",
      icon: ScanFaceIcon,
      title: t("d-home.cards.item4"),
      value: `${vitalinkScans()}`,
    },
  ];


  const extraInformationData = [
    {
      icon: PlusCircle,
      color: "text-blue-gray-300",
      title: `${t("d-home.extra.item1")} ${lastPatientName} ${lastPatientLastName}`,
      description: <Avatar placeholder="" src={"https://i.ibb.co/k1v2vgn/pacient-icon.jpg"} size="sm" className="text-center" />,
    },
    {
      icon: PlusCircle,
      color: "text-blue-gray-300",
      title: `${t("d-home.extra.item2")} ${lastDoctorName} ${lastDoctorLastName}`,
      description: <Avatar placeholder="" src={'/img/doctor-icon.png'} size="sm" variant="rounded" />,
    },
    {
      icon: SlPeople,
      color: "text-blue-gray-300",
      title: `${t("d-home.extra.item3")} ${getElderlyPatients()}`,
      description: <Avatar placeholder="" src={'https://i.ibb.co/0cd85H9/older-Patients-Icon.png'} size="sm" variant="rounded" />,
    },
    {
      icon: TbMoodBoy,
      color: "text-blue-gray-300",
      title: `${t("d-home.extra.item4")} ${getUnderAgePatients()}`,
      description: <Avatar placeholder="" src={'https://i.ibb.co/CsxFJBy/adolescents-icons.png'} size="sm" variant="rounded" />,
    },
    {
      icon: MdBloodtype,
      color: "text-blue-gray-300",
      title: `${t("d-home.extra.item5")}  ${getMostCommonBloodType()}`,
      description: <Avatar placeholder="" src={'https://i.ibb.co/ZJz1vZP/blood-Type-icon.png'} size="sm" variant="rounded" />,
    },
  ];


  return (
    <div className="mt-12">
      <div className="mb-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard //Puesto como any por si da error
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
           
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
                {t("d-home.crud.title")}
              </Typography>
            </div>

          </CardHeader>
          <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[t("d-home.crud.item1"), t("d-home.crud.item2"), t("d-home.crud.item3"), t("d-home.crud.item4"), t("d-home.crud.item5"), t("d-home.crud.item6"), t("d-home.crud.item7"), t("d-home.crud.item8"), t("d-home.crud.item9")].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-center"
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
                    const className = `py-3 px-5 ${key === patientData.length - 1
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
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {area}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {" " + chronicDiseases}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {" " + allergies}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {bloodType}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {birthDate}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs text-center font-medium text-blue-gray-600"
                          >
                            {age}

                            <Progress
                              placeholder=""
                              value={age}
                              variant="gradient"
                              color="green"
                              className="h-1 text-center mt-2"
                            />
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            placeholder=""
                            variant="small"
                            className="text-xs font-medium text-center text-blue-gray-600"
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
              Extra important
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
            {extraInformationData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === extraInformationData.length - 1
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
