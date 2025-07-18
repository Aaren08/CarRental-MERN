import "./Title.css";

const Title = ({ title, subtitle, align }) => {
  return (
    <div className={`title ${align === "left" && "titleAlignLeft"}`}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Title;
