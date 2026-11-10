// components/StatCard.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";

function StatCard({ title, value, percentage, isPositive, chartData }) {
  const theme = useTheme();

  return (
    <Card elevation={1} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={0.5}
        >
          <Typography variant="h5" fontWeight={600}>
            {value}
          </Typography>
          <Chip
            label={`${isPositive ? "+" : "-"}${percentage}`}
            color={isPositive ? "success" : "error"}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Box height={80} mt={2}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="x" tick={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;
