import Message from "../Message";

const About = ({ posts }) => {
  return (
    <div style={{ width: "40%", overflow: "auto" }}>
      <h3>About</h3>
      {posts &&
        posts.map((post, index) => (
          <Message key={`post-${index}`} post={post} />
        ))}
    </div>
  );
};
export default About;
