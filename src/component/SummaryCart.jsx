import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  Plus,
  Search,
  Filter,
  Star,
  Shield,
  Settings,
  ExternalLink,
  Check,
  X,
  Zap,
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  Truck,
  CreditCard,
  Globe,
  Camera,
  Package,
} from "lucide-react";
function SummaryCart({ title, count }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        {title === "Available Apps" ? (
          <Package className="h-8 w-8 text-primary" />
        ) : title === "Enabled Apps" ? (
          <Check className="h-8 w-8 text-green-600" />
        ) : (
          <Star className="h-8 w-8 text-yellow-600" />
        )}
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default SummaryCart;
