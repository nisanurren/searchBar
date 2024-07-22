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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {historyTableColumns.map((column) => (
              <TableCell key={column.name}>{column.name}</TableCell>
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
  );
}

export default HistoryTable;
