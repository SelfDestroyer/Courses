import React, { useEffect, useState } from "react";

const withLoading = (WrapperComponent) => {
  return (props) => {
    const [responsData, setResponsData] = useState(null);

    useEffect(() => {
      props
        .fetchMethod(props.params)
        .then((res) => {
          setResponsData(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [props]);

    return responsData ? (
      <WrapperComponent data={responsData} {...props} />
    ) : (
      <p className="center">Loading...</p>
    );
  };
};

export default withLoading;
