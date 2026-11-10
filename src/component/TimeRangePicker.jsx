import {
  Box,
  Popover,
  Typography,
  Button,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { 
  Clear as ClearIcon, 
  KeyboardArrowDown as KeyboardArrowDownIcon, 
  KeyboardArrowUp as KeyboardArrowUpIcon 
} from "@mui/icons-material";

import { useState, forwardRef, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { hoursOptions, minutesOptions } from "../utils/time";
import { parseTimeStringToDayjs } from "../utils/parseTimeString";

 function TimeRangePicker({value, setValue, onApply }) {
  const [fromHour, setFromHour] = useState(null);
  const [fromMinute, setFromMinute] = useState(null);
  const [fromNoon, setFromNoon] = useState("AM");
  const [toNoon, setToNoon] = useState("AM");
  const [toHour, setToHour] = useState(null);
  const [toMinute, setToMinute] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState("")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
const hours = hoursOptions()
const minutes = minutesOptions()
  return (
<>
<TextField
value={
  value.startTime && value.endTime ? `${value.startTime} - ${value.endTime}` : ""
}
onClick={handleClick}
slotProps={{
  input: {
    readOnly: true,
    endAdornment: (
      <InputAdornment position="end">
        {/* {value.startTime && value.endTime && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setValue({ startTime: "", endTime: "" });
              setFromHour(null)
              setFromMinute(null)
              setToHour(null)
              setToMinute(null)
              setToNoon("AM")
              setFromNoon("AM")
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )} */}
        <IconButton size="small">
          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </InputAdornment>
    ),
  },
}}
fullWidth
sx={{
   "& .MuiOutlinedInput-input": {
         padding: "14px 16px",  
         fontSize:14,
          boxSizing:"border-box",
          height:"48px",
          cursor:"pointer"
            },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor:"divider",
    backgroundColor:"none",
    borderRadius:"16px"
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
       borderColor:"divider",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor:"divider",
    borderWidth: "1px",
  },
}}
placeholder="e.g., 9AM - 5PM"
/>
<Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  sx={{
    "& .MuiPopover-paper": {
      minWidth: 300,
      mt: 0.5,
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
      p:"16px",
      ml:0,
      boxSizing:'border-box',
      overflow:'hidden'
    }
  }}
>
  <Box
  sx={{
    display:'flex',
    width:"100%",
    height:"100%",
    gap:2,
  }}
  >
  <Box
  sx={{
    width:"50%",
    height:"100%",

    overflow:"hidden"
  }}
  >  
  <Typography variant="body1" fontSize={14} fontWeight={500} sx={{
    textAlign:"center",
    textDecoration:"underline"
  }}>From</Typography>
  {/* TimeOptionWrapper */}
  <Box
  sx={{
    display:"flex",
    width:"100%",
    height:213,
        border:'1px solid',
    borderColor: 'divider',
    borderRadius:"8px",

  }}
  >
    {/* HoursOption */}
  <Box
  sx={{
    width:"50%",  
    height:200,
    maxHeight:200,
    // border:'1px solid',
    // borderColor: 'divider',
    overflow:"auto",
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'divider',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
  }}
  >
    {hours.map((hour,index) => (
      <Typography 
      key={index}
      variant="body1"
       fontSize={14} 
       sx={{
        textAlign:"center",
        p:1,
        borderBottom:"1px solid",
        borderBottomColor: "divider",
             cursor:"pointer",
        "&:hover":{
          backgroundColor:fromHour !== hour.toString() ? "divider" : ""
        },
        backgroundColor:fromHour === hour.toString() ? "primary.main" : "",
        color:fromHour === hour.toString() ? "white" : "black",
        borderRadius:"4px"
      }}
      onClick={() => {
        setError("")
        setFromHour(hour.toString())
      setFromMinute("00")}}
      >{hour}</Typography>
    ))}
  </Box>

  {/* MinutesOption */}
  <Box
  sx={{
    width:"50%",  
    height:200,
    maxHeight:200,
    // border:'1px solid #E5E7EB',
    overflow:"auto",
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'secondary.main',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
  }}
  >
    {minutes.map((minute,index) => (
      <Typography
      key={index}
      variant="body1" fontSize={14} sx={{
        textAlign:"center",
        p:1,
        borderBottom:"1px solid",
        borderBottomColor: "divider",
        cursor:"pointer",
        "&:hover":{
          backgroundColor:fromMinute !== minute.toString() ? "divider" : ""
        },
        backgroundColor:fromMinute === minute.toString() ? "primary.main" : "",
        color:fromMinute === minute.toString() ? "white" : "black",
        borderRadius:"4px"

      }}
      onClick={() => {
        if(!fromHour){
          setError("Select hour first")
          return
        }
        setFromMinute(minute.toString())}}
      >{minute}</Typography>
    ))}
  </Box>
  
  </Box>
  {/* AM/PM Selector */}
  <Box
  sx={{
    width:"100%",
    height:30,
    display:"flex",
    p:0,
    m:0,
  justifyContent:'center',
alignItems:'center',
  }}
  >

  <Typography 
  variant="body1"
  fontSize={14}
  sx={{
    cursor:"pointer",
    width:"50%",
    height:"100%",
    textAlign:"center",
    border:"1px solid",
    borderColor: "divider",
    "&:hover":{
      backgroundColor:fromNoon !== "AM" ? "divider" : ""
    },
    backgroundColor:fromNoon === "AM" ? "primary.main" : "",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:fromNoon === "AM" ? "white" : "black",
    borderRadius:"4px"
  }}
  onClick={() => setFromNoon("AM")}
  >AM</Typography>
  <Typography 
  variant="body1"
  fontSize={14}
  sx={{
    width:"50%",
    height:"100%",
    textAlign:"center",
    border:"1px solid",
    borderColor: "divider",
    cursor:"pointer",
    "&:hover":{
      backgroundColor:fromNoon !== "PM" ? "divider" : ""
    },
    backgroundColor:fromNoon === "PM" ? "primary.main" : "",
       display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:fromNoon === "PM" ? "white" : "black",
    borderRadius:"4px"
  }}
  onClick={() => setFromNoon("PM")}
  >PM</Typography>
  </Box>
  </Box>
   <Box
  sx={{
    width:"50%",
    height:"100%",
    overflow:"hidden"
  }}
  >  
  <Typography variant="body1" fontSize={14} fontWeight={500} sx={{
    textAlign:"center",
    textDecoration:"underline"

  }}>To</Typography>
  {/* TimeOptionWrapper */}
  <Box
  sx={{
    display:"flex",
    width:"100%",
    height:213,
          border:'1px solid',
    borderColor: 'divider',
    borderRadius:"8px",
  }}
  >
    {/* HoursOption */}
  <Box
  sx={{
    width:"50%",  
    height:200,
    maxHeight:200,
    overflow:"auto",
    
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'secondary.main',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
  }}
  >
    {hours.map((hour,index) => (
      <Typography 
      key={index}
      variant="body1"
       fontSize={14} 
       sx={{
        textAlign:"center",
        p:1,
        borderBottom:"1px solid",
        borderBottomColor: "divider",
             cursor:"pointer",
        "&:hover":{
          backgroundColor:toHour !== hour.toString() ? "divider" : ""
        },
        backgroundColor:toHour === hour.toString() ? "primary.main" : "",
        color:toHour === hour.toString() ? "white" : "black",
        borderRadius:"4px"
      }}
      onClick={() => {
      setError("")
        setToHour(hour.toString())
        setToMinute("00")}}
      >{hour}</Typography>
    ))}
  </Box>

  {/* MinutesOption */}
  <Box
  sx={{
    width:"50%",  
    height:200,
    maxHeight:200,
    border:'1px solid #E5E7EB',
    overflow:"auto",
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'secondary.main',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
  }}
  >
    {minutes.map((minute,index) => (
      <Typography
      key={index}
      variant="body1" fontSize={14} sx={{
        textAlign:"center",
        p:1,
        borderBottom:"1px solid",
        borderBottomColor: "divider",
        cursor:"pointer",
        "&:hover":{
          backgroundColor:toMinute !== minute.toString() ? "divider" : ""
        },
        backgroundColor:toMinute === minute.toString() ? "primary.main" : "",
        color:toMinute === minute.toString() ? "white" : "black",
        borderRadius:"4px"

      }}
      onClick={() => {
        if(!toHour){
          setError("Select hour first")
          return
        }
        setToMinute(minute.toString())}}
      >{minute}</Typography>
    ))}
  </Box>
  
  </Box>
  {/* AM/PM Selector */}
  <Box
  sx={{
    width:"100%",
    height:30,
    display:"flex",
    p:0,
    m:0,
  justifyContent:'center',
alignItems:'center',
  }}
  >

  <Typography 
  variant="body1"
  fontSize={14}
  sx={{
    cursor:"pointer",
    width:"50%",
    height:"100%",
    textAlign:"center",
    border:"1px solid",
    borderColor: "divider",
    "&:hover":{
      backgroundColor:toNoon !== "AM" ? "divider" : ""
    },
    backgroundColor:toNoon === "AM" ? "primary.main" : "",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:toNoon === "AM" ? "white" : "black",
    borderRadius:"4px"
  }}
  onClick={() => setToNoon("AM")}
  >AM</Typography>
  <Typography 
  variant="body1"
  fontSize={14}
  sx={{
    cursor:"pointer",
    width:"50%",
    height:"100%",
    textAlign:"center",
    border:"1px solid",
    borderColor: "divider",
    "&:hover":{
      backgroundColor:toNoon !== "PM" ? "divider" : ""
    },
    backgroundColor:toNoon === "PM" ? "primary.main" : "",
       display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:toNoon === "PM" ? "white" : "black",
    borderRadius:"4px"
  }}
  onClick={() => setToNoon("PM")}
  >PM</Typography>
  </Box>
  </Box>
  </Box>
  <Typography color="error" fontSize={12}>{error}</Typography>
  <Divider sx={{
    my:2
  }} />
  <Box
  sx={{
    display:"flex",
    gap:1,
    justifyContent:"flex-end",
    alignItems:"center",
  }}
  >
    <Button
    size="small"
    variant="outlined"
    color="error"
    onClick={handleClose}
    >Cancel</Button>
    <Button
    disabled={!fromHour || !fromMinute || !toHour || !toMinute || !fromNoon || !toNoon}
    size="small"
    variant="contained"
    onClick={()=>{
       const startTime = parseTimeStringToDayjs(`${fromHour}:${fromMinute} ${fromNoon}`);
       const endTime = parseTimeStringToDayjs(`${toHour}:${toMinute} ${toNoon}`);
    if (!startTime || !endTime) {
      console.error("Invalid time string:");
      return;
    }
    onApply({start_time:startTime.format("hh:mm A"),end_time:endTime.format("hh:mm A")})
    handleClose()
    }}
    >Apply</Button>
  </Box>
</Popover>
</>)
}
export default TimeRangePicker