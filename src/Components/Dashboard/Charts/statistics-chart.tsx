import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

// interface StataticsCharts {
//   color: "white";
//   title: string;
//   description: string;
//   footer: string;
//   chart: any;
// }

export function StatisticsChart({ color, chart, title, description, footer }: any) {
  return (
    <Card className="border border-blue-gray-100 shadow-sm" placeholder="">
      <CardHeader variant="gradient" placeholder="" color={color} floated={false} shadow={false}>
        <Chart {...chart} />
      </CardHeader>
      <CardBody placeholder="" className="px-6 pt-0">
        <Typography placeholder="" variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography placeholder="" variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter placeholder="" className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
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
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/Components/Dashboard/Charts/statistics-chart.tsx";

export default StatisticsChart;
