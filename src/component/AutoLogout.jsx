import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, Button, Typography, Box } from "@mui/material";

function AutoLogout() {
  const logoutTime = 10000; // 10s inactivity for testing
  const warningTime = 10000; // 5s warning popup

  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(warningTime / 1000);

  const countdownInterval = useRef(null);
  const lastActivity = useRef(Date.now());
  const syncInterval = useRef(null);
  const showWarningRef = useRef(showWarning);

  useEffect(() => {
    showWarningRef.current = showWarning;
  }, [showWarning]);
  useEffect(() => {
    console.log(countdown);
  }, [countdown]);
  // Actual logout
  const logout = () => {
    console.log("AutoLogout: logout() called");
    clearInterval(countdownInterval.current);
    setShowWarning(false);
  };

  // Update last activity timestamp
  const updateLastActivity = () => {
    lastActivity.current = Date.now();
    localStorage.setItem("lastActivity", lastActivity.current.toString());
  };

  // Start countdown timer
  const startCountdown = () => {
    clearInterval(countdownInterval.current);
    let seconds = warningTime / 1000;
    setCountdown(seconds);

    countdownInterval.current = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      if (seconds <= 0) clearInterval(countdownInterval.current);
    }, 1000);
  };

  // Check inactivity
  const checkInactivity = () => {
    const last = parseInt(
      localStorage.getItem("lastActivity") || lastActivity.current
    );
    const inactiveTime = Date.now() - last;

    if (inactiveTime >= logoutTime && !showWarningRef.current) {
      setShowWarning(true);
      startCountdown();

      setTimeout(() => {
        logout();
      }, warningTime);
    }
  };

  useEffect(() => {
    // User activity events
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handleActivity = () => updateLastActivity();
    events.forEach((e) => window.addEventListener(e, handleActivity));

    // Cross-tab activity
    const handleStorage = (e) => {
      if (e.key === "lastActivity") updateLastActivity();
    };
    window.addEventListener("storage", handleStorage);

    // Periodic inactivity check
    syncInterval.current = setInterval(checkInactivity, 1000);

    // Initial activity timestamp
    updateLastActivity();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      window.removeEventListener("storage", handleStorage);
      clearInterval(syncInterval.current);
      clearInterval(countdownInterval.current);
    };
  }, []);

  const stayLoggedIn = () => {
    updateLastActivity();
    setShowWarning(false);
    clearInterval(countdownInterval.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Dialog
      open={showWarning}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, p: 4 } }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Your session is about to expire
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#666", fontSize: "1rem", lineHeight: 1.5 }}
        >
          You'll be automatically logged out due to inactivity in!
        </Typography>
        <Typography
          variant="h2"
          color="error"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            fontFamily: "monospace",
          }}
        >
          {formatTime(countdown)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#666", fontSize: "1rem", lineHeight: 1.5 }}
        >
          Would you like to stay signed in?
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            onClick={logout}
            variant="outlined"
            color="error"
            sx={{ textTransform: "none" }}
          >
            Log out now
          </Button>
          <Button
            onClick={stayLoggedIn}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Stay logged in
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AutoLogout;
