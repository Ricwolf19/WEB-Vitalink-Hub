import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

interface ProfileInfoCardProps {
  title: string;
  description?: string | React.ReactNode;
  details?: Record<string, string | React.ReactNode>; // Assuming the details object is a map of strings or React nodes
  action?: React.ReactNode;
}

export function ProfileInfoCard({ title, description, details, action }: ProfileInfoCardProps): JSX.Element {
  return (
    <Card color="transparent" shadow={false} placeholder="">
      <CardHeader
        color="transparent"
        placeholder=""
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" placeholder="" color="blue-gray">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0" placeholder="">
        {description && (
          <Typography variant="small" placeholder="" className="font-normal text-blue-gray-500">
            {description}
          </Typography>
        )}
        {(description && details) && <hr className="my-8 border-blue-gray-50" />}
        {details && (
          <ul className="flex flex-col gap-4 p-0">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography placeholder="" variant="small" color="blue-gray" className="font-semibold capitalize">
                  {el}:
                </Typography>
                {typeof details[el] === "string" ? (
                  <Typography placeholder="" variant="small" className="font-normal text-blue-gray-500">
                    {details[el]}
                  </Typography>
                ) : (
                  details[el]
                )}
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/Components/Dashboard/Cards/profile-info-card.tsx";

export default ProfileInfoCard;
