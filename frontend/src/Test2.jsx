import React from "react";
import ReactSearchBox from "react-search-box";

const Test2 = () => {
  return (
    <div>
      {" "}
      <ReactSearchBox
        placeholder="Search for John, Jane or Mary"
        data={[
          {
            key: "john",
            value: "John Doe",
          },
          {
            key: "jane",
            value: "Jane Doe",
          },
          {
            key: "mary",
            value: "Mary Phillips",
          },
          {
            key: "robert",
            value: "Robert",
          },
          {
            key: "karius",
            value: "Karius",
          },
        ]}
        onSelect={() => console.log(record)}
        onFocus={() => {
          console.log("This function is called when is focussed");
        }}
        onChange={(value) => console.log(value)}
        autoFocus
        leftIcon={<>🎨</>}
        iconBoxSize="48px"
      />
    </div>
  );
};

export default Test2;
