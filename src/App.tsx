import React, { useState } from 'react'
import { Sun, Moon, BarChart3, Users, DollarSign, Calendar } from 'lucide-react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border bg-card shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Sunset Events Pro</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Clients</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <DollarSign className="w-5 h-5" />
                <span>Vendors</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>Projects</span>
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
                <p className="text-muted-foreground">
                  Welcome to Sunset Events Pro - Your financial management platform
                </p>
              </div>

              {/* Demo Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-meta text-muted-foreground uppercase tracking-wide">Total Revenue</p>
                      <p className="text-title font-bold text-foreground mt-1">₹25,42,000</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-chart-1" />
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-meta text-muted-foreground uppercase tracking-wide">Active Projects</p>
                      <p className="text-title font-bold text-foreground mt-1">12</p>
                    </div>
                    <Calendar className="w-8 h-8 text-chart-2" />
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-meta text-muted-foreground uppercase tracking-wide">Total Clients</p>
                      <p className="text-title font-bold text-foreground mt-1">48</p>
                    </div>
                    <Users className="w-8 h-8 text-chart-3" />
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-meta text-muted-foreground uppercase tracking-wide">Net Profit</p>
                      <p className="text-title font-bold text-foreground mt-1">₹8,45,000</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-chart-4" />
                  </div>
                </div>
              </div>

              {/* Action Buttons Demo */}
              <div className="card p-6">
                <h3 className="text-section font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="button-primary">Add New Project</button>
                  <button className="button-secondary">Create Invoice</button>
                  <button className="button-destructive">Delete Selected</button>
                </div>
              </div>

              {/* Development Status */}
              <div className="mt-8 card p-6 border-accent">
                <h3 className="text-section font-semibold text-foreground mb-4">Development Environment</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-body text-foreground">React + TypeScript</span>
                    <span className="text-meta text-chart-1 font-medium">✓ Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body text-foreground">Tailwind CSS + Design System</span>
                    <span className="text-meta text-chart-1 font-medium">✓ Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body text-foreground">Firebase Configuration</span>
                    <span className="text-meta text-muted-foreground font-medium">⏳ Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body text-foreground">Testing Framework</span>
                    <span className="text-meta text-muted-foreground font-medium">⏳ Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App