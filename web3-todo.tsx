"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, CheckCircle2, Clock, ListTodo, Coins, Plus, Calendar, AlertCircle, Check } from "lucide-react"

interface Task {
  id: string
  name: string
  description: string
  status: "pending" | "completed"
  createdDate: string
  completedDate?: string
  weiValue: string
}

export default function Component() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Complete project documentation",
      description: "Write comprehensive documentation for the Web3 integration features",
      status: "pending",
      createdDate: "2024-01-15",
      weiValue: "1000000000000000000",
    },
    {
      id: "2",
      name: "Review smart contract code",
      description: "Audit the task management smart contract for security vulnerabilities",
      status: "completed",
      createdDate: "2024-01-10",
      completedDate: "2024-01-14",
      weiValue: "2000000000000000000",
    },
    {
      id: "3",
      name: "Deploy to testnet",
      description: "Deploy the application to Ethereum testnet for testing",
      status: "pending",
      createdDate: "2024-01-12",
      weiValue: "500000000000000000",
    },
  ])

  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    weiValue: "",
  })

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsWalletConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  const handleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: "completed" as const, completedDate: new Date().toISOString().split("T")[0] }
          : task,
      ),
    )
  }

  const handleCreateTask = () => {
    if (newTask.name && newTask.description && newTask.weiValue) {
      const task: Task = {
        id: Date.now().toString(),
        name: newTask.name,
        description: newTask.description,
        status: "pending",
        createdDate: new Date().toISOString().split("T")[0],
        weiValue: newTask.weiValue,
      }
      setTasks([...tasks, task])
      setNewTask({ name: "", description: "", weiValue: "" })
      setNewTaskOpen(false)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const pendingTasks = tasks.filter((task) => task.status === "pending").length
  const totalWeiStake = tasks.reduce((sum, task) => sum + Number.parseInt(task.weiValue), 0)

  const formatWei = (wei: string | number) => {
    const weiNum = typeof wei === "string" ? Number.parseInt(wei) : wei
    return (weiNum / 1000000000000000000).toFixed(2) + " ETH"
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">WEB3 TODO</h1>
              <p className="text-slate-600">Manage your tasks on the blockchain</p>
            </div>
            <Button
              onClick={handleConnectWallet}
              disabled={isWalletConnected || isConnecting}
              className={`${
                isWalletConnected ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-2 transition-all duration-200`}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
            </Button>
          </div>

          {!isWalletConnected && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Connect your wallet to manage your tasks on the blockchain.
              </AlertDescription>
            </Alert>
          )}
        </header>

        {/* Metrics Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Tasks</CardTitle>
                <ListTodo className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{totalTasks}</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Completed Tasks</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{completedTasks}</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-cyan-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{pendingTasks}</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Wei in Stake</CardTitle>
                <Coins className="h-4 w-4 text-violet-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{formatWei(totalWeiStake)}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tasks Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
            <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors duration-200"
                  disabled={!isWalletConnected}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>Add a new task to be managed on the blockchain.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Task Name</Label>
                    <Input
                      id="name"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      placeholder="Enter task name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="wei">Wei Value</Label>
                    <Input
                      id="wei"
                      value={newTask.weiValue}
                      onChange={(e) => setNewTask({ ...newTask, weiValue: e.target.value })}
                      placeholder="1000000000000000000"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateTask} className="bg-blue-600 hover:bg-blue-700">
                    Create Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={`border-slate-200 hover:shadow-md transition-all duration-200 ${
                  task.status === "completed" ? "bg-emerald-50 border-emerald-200" : "bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">{task.name}</h3>
                        <Badge
                          variant={task.status === "completed" ? "default" : "secondary"}
                          className={`${
                            task.status === "completed"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : "bg-amber-100 text-amber-800 border-amber-200"
                          }`}
                        >
                          {task.status === "completed" ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-slate-600">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Created: {task.createdDate}</span>
                        </div>
                        {task.completedDate && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Completed: {task.completedDate}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4" />
                          <span>{formatWei(task.weiValue)}</span>
                        </div>
                      </div>
                    </div>
                    {task.status === "pending" && (
                      <Button
                        onClick={() => handleCompleteTask(task.id)}
                        disabled={!isWalletConnected}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 transition-colors duration-200"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Complete Task
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {tasks.length === 0 && (
            <Card className="border-slate-200">
              <CardContent className="p-12 text-center">
                <ListTodo className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks yet</h3>
                <p className="text-slate-600 mb-4">
                  Create your first task to get started with blockchain task management.
                </p>
                <Button
                  onClick={() => setNewTaskOpen(true)}
                  disabled={!isWalletConnected}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Task
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
