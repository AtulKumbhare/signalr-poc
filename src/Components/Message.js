import { Badge } from "@material-ui/core";

const Message = ({post}) => {
  return (
    <div className="post">
      <p className="post-content">{post.message}</p>
      <Badge
        badgeContent={post.date}
        color="secondary"
        className="post-time"
      ></Badge>
    </div>
  );
};
export default Message;
