import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Globe, MousePointer } from 'lucide-react';

const UrlAnalytics = () => {
  // Mock data for analytics
  const clicksData = [
    { day: 'Mon', clicks: 65 },
    { day: 'Tue', clicks: 89 },
    { day: 'Wed', clicks: 103 },
    { day: 'Thu', clicks: 78 },
    { day: 'Fri', clicks: 156 },
    { day: 'Sat', clicks: 134 },
    { day: 'Sun', clicks: 98 },
  ];

  const locationData = [
    { country: 'United States', clicks: 342, percentage: 45 },
    { country: 'United Kingdom', clicks: 156, percentage: 20 },
    { country: 'Canada', clicks: 98, percentage: 13 },
    { country: 'Germany', clicks: 76, percentage: 10 },
    { country: 'Others', clicks: 89, percentage: 12 },
  ];

  const stats = [
    {
      title: 'Total Clicks',
      value: '2,847',
      change: '+12.5%',
      icon: MousePointer,
      color: 'text-primary',
    },
    {
      title: 'Unique Visitors',
      value: '1,924',
      change: '+8.2%',
      icon: Users,
      color: 'text-secondary',
    },
    {
      title: 'Countries',
      value: '23',
      change: '+3',
      icon: Globe,
      color: 'text-accent',
    },
    {
      title: 'CTR',
      value: '3.2%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-green-500">{stat.change} from last week</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Clicks Over Time</CardTitle>
            <CardDescription>Daily click analytics for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clicksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Geographic Distribution</CardTitle>
            <CardDescription>Clicks by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  dataKey="clicks" 
                  fill="hsl(var(--secondary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="gradient-text">Top Performing URLs</CardTitle>
          <CardDescription>Your most clicked shortened URLs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { url: 'short.ly/abc123', original: 'https://example.com/product-launch', clicks: 456, ctr: '3.8%' },
              { url: 'short.ly/def456', original: 'https://blog.example.com/article', clicks: 323, ctr: '2.9%' },
              { url: 'short.ly/ghi789', original: 'https://example.com/signup', clicks: 234, ctr: '4.2%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-primary">{item.url}</p>
                  <p className="text-sm text-muted-foreground truncate">{item.original}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-foreground font-medium">{item.clicks} clicks</span>
                  <span className="text-green-500">{item.ctr} CTR</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlAnalytics;