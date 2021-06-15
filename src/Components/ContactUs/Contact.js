import Message from "../Message";

const Contact = ({ posts }) => {
  return (
    <div style={{ width: "40%", overflow: "auto" }}>
      <h3>Contact</h3>
      {posts &&
        posts.map((post, index) => (
          <Message key={`post-${index}`} post={post} />
        ))}
    </div>
  );
};
export default Contact;
