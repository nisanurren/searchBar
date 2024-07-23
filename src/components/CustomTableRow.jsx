import React, { useState } from "react";
import {epochToHumanRead} from "../utils/utilFunctions"
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
import { KeyboardArrowDown, KeyboardArrowUp, TroubleshootOutlined } from "@mui/icons-material";

function CustomTableRow({ data }) {
  const [open, setOpen] = useState(false);
  const [detailCollapse, setDetailCollapse] = useState(false)
  const [viewCollapse, setViewCollapse] = useState(false)
  const openCollapse=(type)=>{
    if (type === 'detail'){
      setDetailCollapse(!detailCollapse)
    }  else {
      setViewCollapse(!viewCollapse)
    }
  }

  return (
    <>
      <TableRow>
        <TableCell colSpan={2} className="text-white">
          <div
            className={`p-2 rounded-md uppercase text-center bg-green-700 text-white`}
          >
            {data.source}
          </div>{" "}
        </TableCell>
        <TableCell colSpan={2} className="text-white">{data.botName}</TableCell>
        <TableCell colSpan={2} className="text-white">{data.question}</TableCell>
        <TableCell colSpan={2}>
          {data.categories.map((cat) => (
            <div>{cat}</div>
          ))}
        </TableCell>
        <TableCell colSpan={2}>{data.ticketId ?? "-"}</TableCell>
        <TableCell colSpan={2}>{epochToHumanRead(data.createdAt)}</TableCell>
        <TableCell colSpan={2}>
          <div className="flex justify-around">
            <button
              onClick={() => openCollapse('view')}
              className=" bg-fini-blue text-white p-1 rounded-lg hover:bg-fini-blue focus:outline-none focus:ring-2"
            >
              View
            </button>
            <button onClick={() => openCollapse('detail')} className="text-white p-1 bg-green-700 rounded-lg hover:bg-green-900 focus:outline-none focus:ring-2">
              Details
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={viewCollapse} timeout="auto" unmountOnExit>
            <div className="p-6  m-auto max-w-xl" >
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

      <TableRow colSpan={14}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={detailCollapse} timeout="auto" unmountOnExit>
            <ul className="m-auto max-w-xl">
              <li>
                Created At: {epochToHumanRead(data.createdAt)}
              </li>
              <li>Source: {data.source}</li>
              <li>Bot Name: {data.botName}</li>
              </ul>          
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CustomTableRow;
