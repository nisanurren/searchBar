import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const SearchModal = ({ open, question, onQuestionChange, onSubmit, chatHistory, displayedResponse }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Ask a Question</DialogTitle>
      <DialogContent>
        <div className="mb-4">
          {chatHistory.map((entry, index) => (
            entry.role !== 'system' && (
              <div
                key={index}
                className={`flex mb-2 ${entry.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`${entry.role === "user" ? "bg-fini-blue text-white" : "bg-gray-300 text-black"} p-2 rounded`}>
                  <strong>{entry.role === "user" ? "You" : "Bot"}:</strong>{" "}
                  {entry.role === "user"
                    ? entry.content
                    : index < chatHistory.length - 1
                    ? entry.content
                    : entry.content}
                </div>
              </div>
            )
          ))}
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="question"
          label="Your Question"
          type="text"
          fullWidth
          value={question}
          onChange={onQuestionChange}
        />
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
