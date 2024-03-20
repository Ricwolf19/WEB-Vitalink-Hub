import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

// interface StatisticsCardProps {
//   color: "red" | "blue" | "green" | "yellow" | "gray" ; // Specify the type for color, for example, it could be a specific color string or a color enum
//   icon: React.ReactNode; // Assuming icon is an SVG or a React component
//   title: string;
//   value: number; // Introduce specific data type for value as per your requirement
//   footer: string | React.ReactNode; // Specify the type for footer, it could be a string or a React component
// }

export function StatisticsCard({ color, icon, title, value}: any) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm" placeholder="">
      <CardHeader
        variant="gradient"
        placeholder=""
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody placeholder="" className="p-4 text-right">
        <Typography placeholder="" variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography placeholder="" variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/Components/Dashboard/Cards/statistics-card.tsx";

export default StatisticsCard;
