import historyTableColumns from "../utils/constants";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import CustomTableRow from "./CustomTableRow";

function HistoryTable({ history }) {
  return (
    <div className="w-full max-w-screen-lg m-auto"> 
      <TableContainer         sx={{
          bgcolor: 'gradient-custom',
          minWidth: 500,
        }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {historyTableColumns.map((column) => (
                <TableCell colSpan={2} key={column.name}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row) => (
              <CustomTableRow key={row.createdAt} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HistoryTable;
