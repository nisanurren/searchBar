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
import moment from "moment";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function CustomTableRow({ data }) {
  const [open, setOpen] = useState(false);
  const epochToHumanRead = (epoch) => {
    let t = new Date(epoch);
    return moment(t).format("DD.MM.YYYY hh:MM:ss");
  };

  const [collapsedContent, setCollapsedContent] = useState("");

  return (
    <>
      <TableRow>
        <TableCell>{data.source}</TableCell>
        <TableCell>{data.question}</TableCell>
        <TableCell>
          {data.categories.map((c) => (
            <div>{c}</div>
          ))}
        </TableCell>
        <TableCell>{data.ticketId ?? "-"}</TableCell>
        <TableCell>{epochToHumanRead(data.createdAt)}</TableCell>
        <TableCell>
          <div className="flex justify-around">
            <button
              onClick={() => setOpen(!open)}
              className=" bg-fini-blue text-white p-1 rounded-lg hover:bg-fini-blue focus:outline-none focus:ring-2"
            >
              View
            </button>
            <button className="text-white p-1 bg-green-700 rounded-lg hover:bg-green-900 focus:outline-none focus:ring-2">
              Details
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="p-6">
              {data.messageHistory.map(
                (entry, index) =>
                  entry.role !== "system" && (
                    <div
                      key={index}
                      className={`flex mb-2 ${
                        entry.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg text-left ${
                          entry.role === "user"
                            ? "bg-fini-blue text-white"
                            : "bg-gray-300 text-black"
                        } p-2 rounded`}
                      >
                        <strong>
                          {entry.role === "user" ? "You" : "Bot"}:
                        </strong>{" "}
                        {entry.content}
                      </div>
                    </div>
                  )
              )}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CustomTableRow;
