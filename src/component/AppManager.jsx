import React, { useState } from "react";
import { Button, TextField, Input, Box } from "@mui/material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

import { Badge, Select, MenuItem, Switch } from "@mui/material";
//import { useNotifications, createNotification } from "./NotificationService";
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
import SummaryCart from "./SummaryCart";
function AppsManager() {
  //const { addNotification } = useNotifications();

  const [apps, setApps] = useState([
    // Accounting & Finance
    {
      id: "xero",
      name: "Xero",
      description:
        "Cloud-based accounting software for small and medium businesses. Manage invoices, track expenses, and generate financial reports.",
      category: "accounting",
      price: 29,
      priceType: "monthly",
      icon: BarChart3,
      rating: 4.5,
      reviews: 1250,
      isEnabled: false,
      isPremium: true,
      features: [
        "Invoice Management",
        "Expense Tracking",
        "Financial Reporting",
        "Tax Preparation",
        "Bank Reconciliation",
      ],
      setupComplexity: "medium",
      developer: "Xero Limited",
      website: "https://xero.com",
      integrationTime: "2-3 hours",
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      description:
        "Comprehensive accounting solution with advanced features for inventory management and multi-currency support.",
      category: "accounting",
      price: 35,
      priceType: "monthly",
      icon: FileText,
      rating: 4.3,
      reviews: 2100,
      isEnabled: true,
      isPremium: true,
      features: [
        "Advanced Reporting",
        "Inventory Management",
        "Multi-currency",
        "Payroll Integration",
        "Tax Support",
      ],
      setupComplexity: "advanced",
      developer: "Intuit Inc.",
      website: "https://quickbooks.intuit.com",
      integrationTime: "4-6 hours",
    },
    {
      id: "freshbooks",
      name: "FreshBooks",
      description:
        "Simple accounting software designed for small business owners. Easy invoicing and time tracking.",
      category: "accounting",
      price: 19,
      priceType: "monthly",
      icon: CreditCard,
      rating: 4.4,
      reviews: 890,
      isEnabled: false,
      isPremium: false,
      features: [
        "Invoice Creation",
        "Time Tracking",
        "Expense Management",
        "Client Portal",
        "Mobile App",
      ],
      setupComplexity: "easy",
      developer: "FreshBooks",
      website: "https://freshbooks.com",
      integrationTime: "1-2 hours",
    },

    // (Remaining apps list remains unchanged; include all same as original)
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [viewingApp, setViewingApp] = useState(null);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "accounting", label: "Accounting & Finance" },
    { value: "project_management", label: "Project Management" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "payments", label: "Payments" },
    { value: "support", label: "Customer Support" },
    { value: "analytics", label: "Analytics" },
    { value: "marketing", label: "Marketing" },
    { value: "shipping", label: "Shipping & Logistics" },
    { value: "photography", label: "Photography" },
  ];

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || app.category === categoryFilter;

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && app.price === "free") ||
      (priceFilter === "paid" && app.price !== "free");

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleApp = (appId) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, isEnabled: !app.isEnabled } : app
      )
    );

    const app = apps.find((a) => a.id === appId);
    // if (app) {
    //   const action = app.isEnabled ? "disabled" : "enabled";
    //   addNotification(
    //     createNotification.success(
    //       `App ${action.charAt(0).toUpperCase() + action.slice(1)}`,
    //       `${app.name} has been ${action} successfully`
    //     )
    //   );
    // }
  };

  const formatPrice = (price, priceType) => {
    if (price === "free") return "Free";
    if (priceType === "monthly") return `$${price}/month`;
    if (priceType === "yearly") return `$${price}/year`;
    if (priceType === "one-time") return `$${price} one-time`;
    return `${price}% per transaction`;
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const enabledApps = apps.filter((app) => app.isEnabled);
  const totalMonthlySpend = enabledApps.reduce((total, app) => {
    if (app.price === "free") return total;
    if (app.priceType === "monthly") return total + app.price;
    if (app.priceType === "yearly") return total + app.price / 12;
    return total;
  }, 0);
  const summaryCarts = [
    {
      title: "Total Apps",
      value: apps.length,
    },
    {
      title: "Enabled Apps",
      value: enabledApps.length,
    },
    {
      title: "Premium Apps",
      value: enabledApps.filter((app) => app.isPremium).length,
    },
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add-ons</h1>
          <p className="text-muted-foreground">
            Enhance your workflow with powerful integrations and third-party
            apps
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Monthly spend</div>
          <div className="text-2xl font-bold">
            ${totalMonthlySpend.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCarts.map((card) => (
          <SummaryCart key={card.title} title={card.title} count={card.value} />
        ))}
      </div>

      {/* Filters and Search */}
      <Box>
        <Typography variant="body1" fontSize={16} fontWeight={550}>
          App Marketplace
        </Typography>
        <Typography>
          Discover and install apps to extend your business capabilities
        </Typography>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* 
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => {
              const IconComponent = app.icon;
              return (
                <Card
                  key={app.id}
                  className={`relative ${
                    app.isEnabled ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <Typography className="text-lg">
                            {app.name}
                          </Typography>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground ml-1">
                                {app.rating} ({app.reviews})
                              </span>
                            </div>
                            {app.isPremium && (
                              <Badge variant="secondary" className="text-xs">
                                Premium
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={app.isEnabled}
                        onCheckedChange={() => toggleApp(app.id)}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {app.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">
                          {formatPrice(app.price, app.priceType)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Setup: {app.integrationTime}
                        </div>
                      </div>
                      <Badge
                        className={getComplexityColor(app.setupComplexity)}
                      >
                        {app.setupComplexity}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewingApp(app)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(app.website, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>

                  {app.isEnabled && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="default" className="bg-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No apps found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse different
                categories
              </p>
            </div>
          )}
        </CardContent>
      </Box>

      {/* App Details Modal */}
      {viewingApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-muted rounded-lg">
                  <viewingApp.icon className="h-8 w-8" />
                </div>
                <div>
                  <Typography className="text-xl">{viewingApp.name}</Typography>
                  <Typography>by {viewingApp.developer}</Typography>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewingApp(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">
                      {viewingApp.rating}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      ({viewingApp.reviews} reviews)
                    </span>
                  </div>
                  <Badge
                    className={getComplexityColor(viewingApp.setupComplexity)}
                  >
                    {viewingApp.setupComplexity} setup
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {formatPrice(viewingApp.price, viewingApp.priceType)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Integration: {viewingApp.integrationTime}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">
                  {viewingApp.description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {viewingApp.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  className="flex-1"
                  onClick={() => toggleApp(viewingApp.id)}
                  variant={viewingApp.isEnabled ? "destructive" : "default"}
                >
                  {viewingApp.isEnabled ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Disable App
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Enable App
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(viewingApp.website, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AppsManager;
