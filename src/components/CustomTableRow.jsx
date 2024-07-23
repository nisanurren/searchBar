import React, { useState } from "react";
import {epochToHumanRead} from "../utils/utilFunctions"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
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
import { EventRounded, KeyboardArrowDown, KeyboardArrowUp, TroubleshootOutlined } from "@mui/icons-material";
import {setCurrentConversation } from '../store/questionSlice'

function CustomTableRow({ data }) {
  const { chatHistory } = useSelector((state) => state.question);
  const [open, setOpen] = useState(false);
  const [detailCollapse, setDetailCollapse] = useState(false)
  const [viewCollapse, setViewCollapse] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCollapse=(type)=>{
    if (type === 'detail'){
      setDetailCollapse(!detailCollapse)
    }  else {
      setViewCollapse(!viewCollapse)
    }
  }

  const continueToConversation=(chatHistory)=>{

  }

  return (
    <>
      <TableRow>
        <TableCell colSpan={2} className="text-white">
          <div
            className={`p-1 rounded-md uppercase text-xs text-center bg-fini-blue text-white`}
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
              className={`focus:outline-none p-1 rounded-lg ${viewCollapse ? 'bg-fini-blue text-white border-fini-blue' :  'bg-white border border-fini-blue text-fini-blue '}`}
            >
              View
            </button>
            <button onClick={() => openCollapse('detail')} className={`focus:outline-none p-1 rounded-lg ${detailCollapse ? 'bg-fini-blue text-white border-fini-blue' :  'bg-white border border-fini-blue text-fini-blue'}`}>
              Details
            </button>
            <button onClick={() => continueToConversation(data.messageHistory)} className={`focus:outline-none p-1 rounded-lg ${detailCollapse ? 'bg-green-600 text-white border-fini-blue' :  'bg-white border border-green-600 text-green-600'}`}>
              Continue
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
                            : "bg-white text-black border border-fini-blue"
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
            <div className="p-6">
            <ul className="p-6 rounded-md border border-fini-blue m-auto max-w-xl">
              <li>
                <span className="font-semibold">Created At:</span> {epochToHumanRead(data.createdAt)}
              </li>
              <li> <span className="font-semibold">Source:</span> {data.source}</li>
              <li> <span className="font-semibold">Botname:</span> {data.botName}</li>
              </ul>  
            </div>        
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CustomTableRow;
