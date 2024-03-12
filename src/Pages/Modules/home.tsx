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
import { StatisticsCard } from "../../Components/Dashboard/Cards/statistics-card";
import { StatisticsChart } from "../../Components/Dashboard/Charts/statistics-chart";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "../../Data";

import { Users } from "lucide-react";
import { usePatientData } from "../../Context/authContext";

export function Home() {
  const { patientData } = usePatientData()

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
                            <Avatar placeholder="" src={"/img/user-icon.jpg"} alt={name} size="sm" className="text-center" />
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
                            {" " +chronicDiseases}
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
              Orders Overview
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
              <strong>24%</strong> this month
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
