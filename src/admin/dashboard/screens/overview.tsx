"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/utils/tailwind-utils"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  className?: string
}

const AdminOverview: React.FC<Props> = ({ className }) => {
  const edgeRequestsData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 500),
  }))

  const fastDataTransferData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 2 * 1024), // 2MB max
  }))

  const vercelFunctionsData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 40),
  }))

  return (
    <div
      className={cn(
        "flex-1 px-4 py-6 md:px-6 max-w-screen-2xl mx-auto w-full",
        "flex items-start gap-4",
        className
      )}
    >
      <div className="w-[350px] shrink-0 ">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Project Overview</h2>

          <p className="text-sm text-muted-foreground">
            This is a summary of the project&apos;s performance and usage.
          </p>
        </div>
      </div>
      <div className="flex-1 grow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Monitoring</h2>

          <div className="flex items-center gap-4">
            <Select defaultValue="production">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="12h">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="6h">Last 6 hours</SelectItem>
                <SelectItem value="12h">Last 12 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Edge Requests Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Edge Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.3K</div>
              <div className="text-xs text-muted-foreground">Invocations</div>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={edgeRequestsData}>
                    <XAxis dataKey="time" hide />
                    <YAxis dataKey="value" hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded p-2">
                              <p className="text-sm">{`${payload[0].value} requests`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4ade80"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Fast Data Transfer Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Fast Data Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 MB</div>
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fastDataTransferData}>
                    <XAxis dataKey="time" hide />
                    <YAxis dataKey="value" hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded p-2">
                              <p className="text-sm">{`${payload[0].value} KB`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4ade80"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Vercel Functions Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Vercel Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">398</div>
              <div className="text-xs text-muted-foreground">Invocations</div>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vercelFunctionsData}>
                    <XAxis dataKey="time" hide />
                    <YAxis dataKey="value" hide />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded p-2">
                              <p className="text-sm">{`${payload[0].value} invocations`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4ade80"
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Edge Functions Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">Edge Functions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-muted-foreground">Invocations</div>
              <div className="h-[200px] mt-4 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No invocations in this time range</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Project</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Requests</span>
                </div>
              </div>
            </div>
            <div className="divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>codestus</span>
                </div>
                <span>3K</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500" />
                  <span>minimal</span>
                </div>
                <span>150</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>hookform-field</span>
                </div>
                <span>59</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminOverview
