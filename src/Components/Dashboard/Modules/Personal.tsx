import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import {
  Button,
} from "@nextui-org/react";
import { useDoctorData, usePatientData, } from "../../../Context/authContext";
import { EditPatient } from "../CrudActions/EditPatient";
import { EditDoctor } from "../CrudActions/EditDoctor";
import { ActivityIcon, UserMinus } from "lucide-react";
import { AddPatient } from "../CrudActions/AddPatient";
import { AddDoctor } from "../CrudActions/AddDoctor";
import { useTranslation } from "react-i18next";

export function Personal() {
  const { patientData, handleDeletePatient } = usePatientData();
  const { handleDeleteDoctor, doctorData } = useDoctorData()
  const { getVitaLinkSigns } = usePatientData()

  const [t] = useTranslation("global")

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card placeholder="">
        <CardHeader placeholder="" variant="gradient" color="red" className="mb-8 p-6">
          <Typography placeholder="" variant="h6" color="white">
          {t("d-personal.patients.title")}
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[t("d-home.crud.item1"), t("d-home.crud.item2"), t("d-home.crud.item3"), t("d-home.crud.item4"), t("d-home.crud.item5"), t("d-home.crud.item6"), t("d-home.crud.item7"), t("d-home.crud.item8"), t("d-home.crud.item9")].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="text-[14px] font-bold uppercase text-blue-900"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
                <th>
                  <AddPatient />
                </th>
              </tr>
            </thead>
            <tbody>
              {patientData.map(
                ({ age, allergies, area, birthDate, bloodType, chronicDiseases, lastName, name, status, doctorAssigned, id }: any, key: any) => {
                  const className = `py-3 px-5 text-center ${key === patientData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  // const formattedBirthDate = birthDate ? format(birthDate.toDate(), 'MMMM do, yyyy') : ''; // Converting the timestamp to a human-readable date format

                  // function handleDeletePatient(id: any): void {
                  //   throw new Error("Function not implemented.");
                  // }

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="items-center text-center">
                          <Avatar placeholder="" src={'https://i.ibb.co/k1v2vgn/pacient-icon.jpg'} alt={name} variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography placeholder="" className="text-sm font-normal text-black">
                              {lastName}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color="blue"
                          value={status}
                          className="py-0.5 px-2 text-[14px] font-semibold"
                        />
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {area}
                        </Typography>
                        {/* <Typography placeholder="" className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black text-center">
                          {`${chronicDiseases}`}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {" " + allergies + " "}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {bloodType}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {birthDate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {age}
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="items-centertext-center">
                          <Avatar placeholder="" src={'/img/doctor-icon.png'} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {doctorAssigned ? "Doctor: " + doctorAssigned : "Doctor not assigned yet"}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      {/* <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {vitaLinkSigns}
                        </Typography>
                      </td> */}

                      <td className={className}>
                        <div className="flex flex-col gap-2 ">
                          <Button onClick={() => getVitaLinkSigns(id)} color="secondary" variant="light">
                            <ActivityIcon />
                          </Button>

                          <EditPatient
                            name={name}
                            lastName={lastName}
                            age={age}
                            birthDate={birthDate}
                            area={area}
                            status={status}
                            allergies={allergies}
                            chronicDiseases={chronicDiseases}
                            doctorAssigned={doctorAssigned}
                            bloodType={bloodType}
                            id={id}
                          />

                          <div className="pt-2">
                            <Button color="danger" variant="shadow" startContent={<UserMinus />} className="font-semibold" onClick={() => handleDeletePatient(id)}>
                            {t("d-personal.delete")}
                            </Button>
                          </div>
                          
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card placeholder="">
        <CardHeader placeholder="" variant="gradient" color="red" className="mb-8 p-6">
          <Typography placeholder="" variant="h6" color="white">
          {t("d-personal.doctors.title")}
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[t("d-personal.doctors.crudActions.item1"), t("d-personal.doctors.crudActions.item3"), t("d-personal.doctors.crudActions.item4"), t("d-personal.doctors.crudActions.item5"), t("d-personal.doctors.crudActions.item7")].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="text-[14px] font-bold uppercase text-blue-900"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
                <th>
                  <AddDoctor />
                </th>
              </tr>
            </thead>
            <tbody>
              {doctorData.map(
                ({ name, lastName, area, numCedula, patients, status, id }: any, key: any) => {
                  const className = `py-3 px-5 text-center ${key === doctorData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="items-center gap-4 text-center">
                          <Avatar placeholder="" src={'/img/doctor-icon.png'} alt={name} variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography placeholder="" className="text-sm font-normal text-black">
                              {lastName}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color="blue"
                          value={status}
                          className="py-0.5 px-2 text-[14px] font-semibold"
                        />
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {area}
                        </Typography>
                        {/* <Typography placeholder="" className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black text-center">
                          {numCedula}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {" " + patients + " "}
                        </Typography>
                      </td>
                      {/* <td className={className}>
                        <div className="flex items-center gap-4 text-center">
                          <Avatar placeholder="" src={'/img/doctor-icon.png'} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {doctorAssigned ? "Doctor: " + doctorAssigned : "Doctor not assigned yet"}
                            </Typography>
                          </div>
                        </div>
                      </td> */}

                      <td className={className}>
                        <div className=" flex-col gap-2">
                          <EditDoctor
                            name={name}
                            lastName={lastName}
                            area={area}
                            numCedula={numCedula}
                            status={status}
                            id={id}
                            patients={patients}
                          />
                          <div className="pt-2">
                            <Button color="danger" variant="shadow" startContent={<UserMinus />} className="font-semibold" onClick={() => handleDeleteDoctor(id)} >
                            {t("d-personal.delete")}
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

