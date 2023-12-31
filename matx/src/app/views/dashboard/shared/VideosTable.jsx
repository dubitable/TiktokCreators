import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paragraph, H4 } from "app/components/Typography";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Dialog from "./Dialog";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const url =
  "https://tiktokcreators-production.up.railway.app/tonedetection/comments?";

const Video = ({ video, index, setSelected }) => {
  const [toneData, setToneData] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false); // popup starts out closed

  const getData = async (id) => {
    const response = await fetch(url + new URLSearchParams({ id }));
    const json = await response.json();
    setToneData(json);
  };

  // popupOpen = true; - python / regular javascript implementation (DO NOT USE THIS)
  // setPopupOpen(true); - react implementation (USE THIS)

  function openPopup() {
    setPopupOpen(true);
    getData(video.video_id);
  }

  // this is the kind of setup that you might come across
  // <Popup isOpen = {popupOpen} onClose = {() => setPopupOpen(false)}/>

  return (
    <TableRow key={index} hover>
      <Dialog open={popupOpen} setOpen={setPopupOpen} toneData={toneData} video={video}/>
      <TableCell
        colSpan={4}
        align="left"
        sx={{ px: 0, textTransform: "capitalize" }}
      >
        <Box display="flex" alignItems="center">
          <Avatar src={video.cover} />
          <a
            href={`https://www.tiktok.com/@kristel99999/video/${video.video_id}`}
          >
            <Paragraph sx={{ m: 0, ml: 4 }}>
              {video.title?.split("#")[0]}
            </Paragraph>
          </a>
        </Box>
      </TableCell>

      <TableCell
        align="left"
        colSpan={2}
        sx={{ px: 0, textTransform: "capitalize" }}
      >
        {video.play_count}
      </TableCell>

      <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
        {new Date(video.create_time * 1000).toDateString()}
      </TableCell>

      <TableCell sx={{ px: 0 }} colSpan={1}>
        <IconButton
          onClick={() => {
            openPopup();
          }}
        >
          <Icon color="primary">expand</Icon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const VideosTable = (props) => {
  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>recent videos</Title>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <H4>
            {(props.cursor + 1) * props.size} / {props.videos.length}
          </H4>
          <div>
            <IconButton onClick={() => props.updateCursor("back")}>
              <ArrowBackIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => props.updateCursor("front")}>
              <ArrowForwardIcon color="primary" />
            </IconButton>
          </div>
        </div>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Video
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Plays
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Date
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.videos
              .slice(props.cursor * props.size, (props.cursor + 1) * props.size)
              .map((video, index) => (
                <Video
                  key={index}
                  video={video}
                  index={index}
                  setSelected={props.setSelected}
                />
              ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default VideosTable;
