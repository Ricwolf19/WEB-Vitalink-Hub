import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";

interface MessageCardProps {
  img: string;
  name: string;
  message: string | React.ReactNode;
  action?: React.ReactNode;
}

export function MessageCard({ img, name, message, action }: MessageCardProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar
          src={img}
          alt={name}
          variant="rounded"
          className="shadow-lg shadow-blue-gray-500/25"
          placeholder="" // Make placeholder optional
        />
        <div>
          <Typography
            color="blue-gray"
            className="mb-1 font-semibold"
            placeholder="" // Make placeholder optional
          >
            {name}
          </Typography>
          <Typography placeholder="">{message}</Typography> // Make placeholder optional
        </div>
      </div>
      {action}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  action: PropTypes.node,
};

MessageCard.displayName = "/src/Components/Dashboard/Cards/message-card.tsx";

export default MessageCard;
