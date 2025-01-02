const DisplayData = ({ data }) => {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => <div key={item.key}>{item.value}</div>)}
    </div>
  );
};
export default DisplayData;
