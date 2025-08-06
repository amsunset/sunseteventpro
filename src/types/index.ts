// Core entity types based on the Firestore data model

export interface Client {
  clientId: string
  clientName: string
  contactPerson: string
  phone: string
  email: string
  billingAddress: string
  gstin: string
  createdAt: Date
  updatedAt: Date
}

export interface Vendor {
  vendorId: string
  vendorName: string
  category: string
  contactPerson: string
  phone: string
  email: string
  billingAddress: string
  gstin: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  projectId: string
  clientId: string
  projectName: string
  businessType: string
  eventDate: Date
  billingAmount: number
  totalInternalVendorCosts: number
  grossProfit: number
  operatingCosts: number
  operatingProfit: number
  taxRate: number
  taxes: number
  netProfit: number
  netProfitPercent: number
  amountReceived: number
  balanceDue: number
  amountPaid: number
  balancePayable: number
  projectCashflowBalance: number
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
}

export interface ProjectLineItem {
  lineItemId: string
  projectId: string
  head: string
  description: string
  budgetExternalCost: number
  internalCost: number
  vendorId: string
}

export interface Payment {
  paymentId: string
  projectId: string
  clientId?: string
  vendorId?: string
  amount: number
  paymentType: 'received' | 'paid'
  paymentDate: Date
  description: string
  createdAt: Date
}

export interface CashFlowItem {
  month: string
  inflows: number
  outflows: number
  endingBalance: number
}

export interface ScenarioVariables {
  scenarioId: string
  totalMonthlyVendorPaymentBudget: number
  receivableCollectionsFactor: number
  vendorPayoutFactor: number
  fixedMonthlyOpEx: number
}

// Enums
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'cancelled'
export type UserRole = 'admin' | 'finance' | 'ops' | 'viewer'

// UI types
export interface DashboardKPI {
  label: string
  value: string | number
  icon: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
}

export interface NotificationSettings {
  userId: string
  eventType: string
  channel: 'in-app' | 'email' | 'browser' | 'telegram' | 'whatsapp'
  enabled: boolean
  digest: boolean
}

export interface User {
  userId: string
  email: string
  displayName: string
  role: UserRole
  permissions: Permission[]
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  module: string
  canEdit: boolean
  canView: boolean
  canDelete: boolean
}