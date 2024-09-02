import { useEffect, useState } from "react";
import React from 'react'
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Container } from "@mui/system";

function Main() {
const [getApiData, setGetApiData] = useState([]);
const [showTable, setShowTable] = useState(false);
useEffect(() => {
    getAllUserData();
},[])
async function getAllUserData() {
  await fetch("http://localhost:8001/WholeData")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("All user Data", data);
      setGetApiData(data);
    })
    .catch((error) => {
      console.error("Error Getting All User Data message:", error);
    })
    .finally(() => {
      console.log("Always Executed");
    });
}

  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          setShowTable(true);
        }}
        sx={{ m: 5 }}
      >
        Show Table
      </Button>
      {showTable && (
        <TableContainer  elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">UserName</TableCell>
                <TableCell align="left">FirstName</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getApiData.map((row,index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell align="left">{row.UserName}</TableCell>
                  <TableCell align="left">{row.FirstName}</TableCell>
                  <TableCell align="left">{row.Role}</TableCell>
                  <TableCell align="center">{row.Grades}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Main;
