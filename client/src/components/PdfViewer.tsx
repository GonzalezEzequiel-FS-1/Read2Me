import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Print,
  Fullscreen,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

// Use local worker from node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  file: File | string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fileData, setFileData] = useState<File | string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [pageInput, setPageInput] = useState<string>("1");

  useEffect(() => {
    if (file instanceof File) {
      const fileUrl = URL.createObjectURL(file);
      setFileData(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    } else {
      setFileData(file);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput("1");
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please check the file path.");
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, numPages));
    setPageNumber(validPage);
    setPageInput(validPage.toString());
  };

  const nextPage = () => goToPage(pageNumber + 1);
  const prevPage = () => goToPage(pageNumber - 1);
  const firstPage = () => goToPage(1);
  const lastPage = () => goToPage(numPages);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput, 10);
    if (!isNaN(page)) {
      goToPage(page);
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const handleDownload = () => {
    if (typeof fileData === "string") {
      const link = document.createElement("a");
      link.href = fileData;
      link.download = "document.pdf";
      link.click();
    }
  };

  const handlePrint = () => {
    if (typeof fileData === "string") {
      const printWindow = window.open(fileData);
      printWindow?.print();
    }
  };

  const handleFullscreen = () => {
    const pdfContainer = document.getElementById("pdf-container");
    if (pdfContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        pdfContainer.requestFullscreen();
      }
    }
  };

  if (!fileData)
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Loading PDF…</Typography>
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
      {/* Toolbar */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Navigation Controls */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="First Page">
            <span>
              <IconButton
                onClick={firstPage}
                disabled={pageNumber <= 1}
                size="small"
              >
                <FirstPage />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Previous Page">
            <span>
              <IconButton
                onClick={prevPage}
                disabled={pageNumber <= 1}
                size="small"
              >
                <ChevronLeft />
              </IconButton>
            </span>
          </Tooltip>

          <Box
            component="form"
            onSubmit={handlePageInputSubmit}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <TextField
              size="small"
              value={pageInput}
              onChange={handlePageInputChange}
              sx={{ width: "60px" }}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Typography variant="body2">of {numPages}</Typography>
          </Box>

          <Tooltip title="Next Page">
            <span>
              <IconButton
                onClick={nextPage}
                disabled={pageNumber >= numPages}
                size="small"
              >
                <ChevronRight />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Last Page">
            <span>
              <IconButton
                onClick={lastPage}
                disabled={pageNumber >= numPages}
                size="small"
              >
                <LastPage />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        {/* Zoom Controls */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 2 }}>
          <Tooltip title="Zoom Out">
            <IconButton onClick={zoomOut} disabled={scale <= 0.5} size="small">
              <ZoomOut />
            </IconButton>
          </Tooltip>

          <Box sx={{ width: 120 }}>
            <Slider
              value={scale}
              onChange={(_, value) => setScale(value as number)}
              min={0.5}
              max={3.0}
              step={0.1}
              size="small"
            />
          </Box>

          <Typography variant="body2" sx={{ minWidth: "45px" }}>
            {Math.round(scale * 100)}%
          </Typography>

          <Tooltip title="Zoom In">
            <IconButton onClick={zoomIn} disabled={scale >= 3.0} size="small">
              <ZoomIn />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
          <Tooltip title="Download">
            <IconButton onClick={handleDownload} size="small">
              <Download />
            </IconButton>
          </Tooltip>

          <Tooltip title="Print">
            <IconButton onClick={handlePrint} size="small">
              <Print />
            </IconButton>
          </Tooltip>

          <Tooltip title="Fullscreen">
            <IconButton onClick={handleFullscreen} size="small">
              <Fullscreen />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* PDF Display */}
      <Paper
        id="pdf-container"
        elevation={2}
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          bgcolor: "#525659",
          minHeight: "600px",
        }}
      >
        <Document
          file={fileData}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <Box display="flex" justifyContent="center" p={4}>
              <Typography color="white">Loading document...</Typography>
            </Box>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </Paper>
    </Box>
  );
};

export default PdfViewer;
