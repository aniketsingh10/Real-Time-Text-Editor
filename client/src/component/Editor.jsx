import { useEffect, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import BlotFormatter from "quill-blot-formatter";

Quill.register("modules/blotFormatter", BlotFormatter);

const Component = styled.div`
  background: #f5f5f5;
`;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
 
  ["image"],
  [{ color: [] }, { background: [] }],

  [{ align: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ["clean"],
 
];
const Editor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id } = useParams();

  useEffect(() => {
    const quillServer = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
        clipboard: {
          matchVisual: false,
        },
        blotFormatter: {},
      },
    });
    quillServer.disable();
    quillServer.setText("Loading the document...");
    setQuill(quillServer);
  }, []);

  useEffect(() => {
    const socketServer = io("https://real-time-text-editor.onrender.com");
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta, oldData, source) => {
      if (source !== "user") return;

      socket.emit("send-changes", delta);
    };

    quill && quill.on("text-change", handleChange);

    return () => {
      quill && quill.off("text-change", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (delta) => {
      quill.updateContents(delta);
    };

    socket && socket.on("receive-changes", handleChange);

    return () => {
      socket && socket.off("receive-changes", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (quill === null || socket === null) return;

    socket &&
      socket.once("load-document", (document) => {
        quill.setContents(document);
        quill.enable();
      });

    socket && socket.emit("get-document", id);
  }, [quill, socket, id]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const interval = setInterval(() => {
      socket && socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <Component>
      <Box className="container" id="container"></Box>
    </Component>
  );
};

export default Editor;
