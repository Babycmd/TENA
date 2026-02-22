import { useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Target, 
  DollarSign, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Bell
} from 'lucide-react'

const Finance = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Mock data for the financial app
  const accounts = [
    { id: 1, name: 'Main Checking', type: 'checking', balance: 12450.00, icon: Wallet, color: 'bg-blue-500' },
    { id: 2, name: 'Savings Account', type: 'savings', balance: 45230.50, icon: Target, color: 'bg-green-500' },
    { id: 3, name: 'Credit Card', type: 'credit', balance: -2340.00, icon: CreditCard, color: 'bg-red-500' },
    { id: 4, name: 'Investment', type: 'investment', balance: 87650.00, icon: TrendingUp, color: 'bg-purple-500' },
  ]

  const transactions = [
    { id: 1, name: 'Salary Deposit', amount: 5200.00, date: '2026-02-20', type: 'income', category: 'Salary' },
    { id: 2, name: 'Grocery Store', amount: -156.80, date: '2026-02-19', type: 'expense', category: 'Food' },
    { id: 3, name: 'Electric Bill', amount: -89.50, date: '2026-02-18', type: 'expense', category: 'Utilities' },
    { id: 4, name: 'Freelance Payment', amount: 1200.00, date: '2026-02-17', type: 'income', category: 'Freelance' },
    { id: 5, name: 'Netflix Subscription', amount: -15.99, date: '2026-02-16', type: 'expense', category: 'Entertainment' },
    { id: 6, name: 'Gas Station', amount: -65.00, date: '2026-02-15', type: 'expense', category: 'Transport' },
  ]

  const budgetCategories = [
    { name: 'Food & Dining', spent: 450, limit: 600, color: 'bg-orange-500' },
    { name: 'Transportation', spent: 180, limit: 300, color: 'bg-blue-500' },
    { name: 'Entertainment', spent: 120, limit: 200, color: 'bg-purple-500' },
    { name: 'Shopping', spent: 320, limit: 400, color: 'bg-pink-500' },
    { name: 'Utilities', spent: 180, limit: 250, color: 'bg-green-500' },
  ]

  const savingsGoals = [
    { name: 'Emergency Fund', current: 8500, target: 10000, color: 'bg-green-500' },
    { name: 'Vacation', current: 2400, target: 5000, color: 'bg-blue-500' },
    { name: 'New Car', current: 12000, target: 30000, color: 'bg-purple-500' },
    { name: 'Home Down Payment', current: 35000, target: 100000, color: 'bg-orange-500' },
  ]

  const investments = [
    { name: 'Tech Stocks', value: 45600, change: 2.4, type: 'Stocks' },
    { name: 'Bond Funds', value: 23400, change: 0.8, type: 'Bonds' },
    { name: 'Real Estate', value: 18650, change: 1.2, type: 'REIT' },
  ]

  const bills = [
    { name: 'Electric Bill', amount: 89.50, dueDate: '2026-02-25', status: 'pending' },
    { name: 'Internet', amount: 65.00, dueDate: '2026-02-28', status: 'pending' },
    { name: 'Phone Bill', amount: 45.00, dueDate: '2026-03-01', status: 'pending' },
    { name: 'Insurance', amount: 180.00, dueDate: '2026-03-05', status: 'pending' },
  ]

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const monthlyIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <p className="text-3xl font-bold mt-1">${totalBalance.toLocaleString()}</p>
            </div>
            <Wallet className="w-12 h-12 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-100">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+2.4% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Monthly Income</p>
              <p className="text-3xl font-bold mt-1">${monthlyIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
          <div className="mt-4 flex items-center text-sm text-green-100">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Monthly Expenses</p>
              <p className="text-3xl font-bold mt-1">${monthlyExpenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-12 h-12 text-red-200" />
          </div>
          <div className="mt-4 flex items-center text-sm text-red-100">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>-5% from last month</span>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <div key={account.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`${account.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <account.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{account.type}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{account.name}</p>
              <p className={`text-xl font-bold mt-1 ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(account.balance).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.type === 'income' ? (
                    <ArrowDownRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.date} • {transaction.category}</p>
                </div>
              </div>
              <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Monthly Budget</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
        <div className="space-y-4">
          {budgetCategories.map((category, index) => {
            const percentage = (category.spent / category.limit) * 100
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 dark:text-white">{category.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${category.spent} / ${category.limit}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <p className={`text-xs ${percentage > 90 ? 'text-red-500' : percentage > 70 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {percentage > 90 ? 'Over budget!' : percentage > 70 ? 'Approaching limit' : `${(100 - percentage).toFixed(0)}% remaining`}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Spending by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Spending Overview</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray="75.4 251.2" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="37.7 251.2" strokeDashoffset="-75.4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="25.1 251.2" strokeDashoffset="-113.1" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="50.2 251.2" strokeDashoffset="-138.2" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="37.7 251.2" strokeDashoffset="-188.4" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {budgetCategories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSavings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Savings Goals</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Goal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savingsGoals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{goal.name}</h4>
                  <span className="text-sm text-gray-500">{percentage.toFixed(0)}%</span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full ${goal.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${goal.current.toLocaleString()} saved
                  </p>
                  <p className="text-sm text-gray-500">
                    ${goal.target.toLocaleString()} goal
                  </p>
                </div>
                <button className="w-full mt-4 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-700 dark:text-white py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                  Add Funds
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderInvestments = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Investment Portfolio</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Invest
          </button>
        </div>
        
        {/* Portfolio Summary */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-6 text-white mb-6">
          <p className="text-purple-100 text-sm">Total Portfolio Value</p>
          <p className="text-4xl font-bold mt-1">${investments.reduce((sum, inv) => sum + inv.value, 0).toLocaleString()}</p>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+1.8% ($1,566) today</span>
          </div>
        </div>

        {/* Individual Investments */}
        <div className="space-y-4">
          {investments.map((investment, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{investment.name}</p>
                  <p className="text-sm text-gray-500">{investment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 dark:text-white">${investment.value.toLocaleString()}</p>
                <p className={`text-sm ${investment.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {investment.change >= 0 ? '+' : ''}{investment.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBills = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Bills</h3>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">4 pending</span>
        </div>
        
        <div className="space-y-4">
          {bills.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{bill.name}</p>
                  <p className="text-sm text-gray-500">Due: {bill.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-gray-800 dark:text-white">${bill.amount}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Due */}
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800 dark:text-white">Total Due This Month</span>
            <span className="text-2xl font-bold text-red-600">${bills.reduce((sum, b) => sum + b.amount, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Wallet },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'savings', label: 'Savings', icon: Target },
    { id: 'investments', label: 'Investments', icon: TrendingUp },
    { id: 'bills', label: 'Bills', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Finance</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your finances in one place</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Money
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'budget' && renderBudget()}
        {activeTab === 'savings' && renderSavings()}
        {activeTab === 'investments' && renderInvestments()}
        {activeTab === 'bills' && renderBills()}
      </div>
    </div>
  )
}

export default Finance
