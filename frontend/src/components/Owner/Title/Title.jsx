import "./Title.css";

const Title = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="owner-title">{title}</h1>
      <p className="owner-subtitle">{subtitle}</p>
    </>
  );
};

export default Title;
