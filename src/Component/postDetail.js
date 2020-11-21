import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";

function PostDetails(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const pk = props.match.params.id;
    const fetchData = async () => {
      const result = await axios(
        "https://jsonplaceholder.typicode.com/posts/" + pk
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Typography align="center" variant="h3">
        {data.id}
      </Typography>
      <Typography align="center" variant="h3" color="primary">
        {data.title}
      </Typography>
      <Typography align="center" color="inherit">
        {data.body}
      </Typography>
    </div>
  );
}

export default PostDetails;
