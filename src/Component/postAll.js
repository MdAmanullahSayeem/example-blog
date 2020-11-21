import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

function PostAll() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://jsonplaceholder.typicode.com/posts");
      setPosts(result.data);
      console.log(result);
    };
    fetchData();
  }, []);
  const handleClick = (item) => {
    history.replace(`/posts/${item.id}`);
  };
  const handleComments = (item) => {
    history.replace(`/posts/${item.id}/comments/`);
  };
  return (
    <div>
      <Typography>All Posts</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((item) => (
            <TableRow>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClick(item)}
                >
                  Detais
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleComments(item)}
                >
                  Comments
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PostAll;
