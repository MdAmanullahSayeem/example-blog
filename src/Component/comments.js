import React, { useState, useEffect } from "react";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

function PostComments(props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const pk = props.match.params.id;
    const fetchData = async () => {
      const result = await axios(
        "https://jsonplaceholder.typicode.com/posts/" + pk + "/comments/"
      );
      setComments(result.data);
    };
    fetchData();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableCell>Total {comments.length} Comments</TableCell>
        <TableCell>User</TableCell>
      </TableHead>

      <TableBody>
        {comments.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.body}</TableCell>
            <TableCell>
              <Button><PersonIcon /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PostComments;
