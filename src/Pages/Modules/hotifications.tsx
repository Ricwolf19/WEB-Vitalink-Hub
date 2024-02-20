import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface ShowAlertsState {
  [key: string]: boolean; // Define an index signature for dynamic key access
}

type colors = "gray" | "green" | "orange" | "red"; // Define a custom type for colors

export function Notifications() {

  const [showAlerts, setShowAlerts] = React.useState<ShowAlertsState>({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });

  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState<ShowAlertsState>({
    blue: true,
    green: true,
    orange: true,
    red: true,
  });

  const alerts: colors[] = ["gray", "green", "orange", "red"];


  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card placeholder="">
        <CardHeader
        placeholder=""
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography placeholder="" variant="h5" color="blue-gray">
            Alerts
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="flex flex-col gap-4 p-4">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlerts[color]}
              color={color}
              onClose={() => setShowAlerts((current) => ({ ...current, [color]: false }))}
            >
              A simple {color} alert with an <a href="#">example link</a>. Give
              it a click if you like.
            </Alert>
          ))}
        </CardBody>
      </Card>
      <Card placeholder="">
        <CardHeader
        placeholder=""
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography placeholder="" variant="h5" color="blue-gray">
            Alerts with Icon
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="flex flex-col gap-4 p-4">
          {alerts.map((color) => (
            <Alert
              key={color}
              open={showAlertsWithIcon[color]}
              color={color}
              icon={
                <InformationCircleIcon strokeWidth={2} className="h-6 w-6" />
              }
              onClose={() => setShowAlertsWithIcon((current) => ({
                ...current,
                [color]: false,
              }))}
            >
              A simple {color} alert with an <a href="#">example link</a>. Give
              it a click if you like.
            </Alert>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
