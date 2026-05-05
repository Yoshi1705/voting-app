import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, Users, BarChart3, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [candidateCount, setCandidateCount] = useState<number>(0);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [isElectionActive, setIsElectionActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const candidates = await dashboardService.getCandidateCount();
      setCandidateCount(candidates);
    } catch (err) {
      console.error("Candidate error", err);
    }

    try {
      if (user?.role === 'ADMIN') {
        const votes = await dashboardService.getTotalVotes();
        setTotalVotes(votes);
      }
    } catch (err) {
      console.error("Votes error", err);
    }

    try {
      const electionStatus = await dashboardService.getElectionStatus();
      setIsElectionActive(electionStatus);
    } catch (err) {
      console.error("Election status error", err);
    }

    setIsLoading(false);
  };

  fetchStats();
}, [user?.role]);

  useEffect(() => {
      console.log("candidateCount",candidateCount);
  },[candidateCount])

  const getDashboardStats = () => {
    const stats = [
      {
        label: 'Total Candidates',
        value: isLoading ? '...' : String(candidateCount),
        icon: Users,
        color: 'text-blue-600 bg-blue-100'
      },
      {
        label: 'Active Elections',
        value: isLoading ? '...' : isElectionActive ? '1' : '0',
        icon: Calendar,
        color: 'text-purple-600 bg-purple-100'
      },
      { 
        label: 'Voter Turnout', 
        value: '87%', 
        icon: BarChart3, 
        color: 'text-orange-600 bg-orange-100' 
      },
    ];

    if (user?.role === 'ADMIN') {
      stats.splice(1, 0, {
        label: 'Total Votes Cast',
        value: isLoading ? '...' : String(totalVotes),
        icon: Vote,
        color: 'text-green-600 bg-green-100'
      });
    }

    return stats;
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'ADMIN':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Admin Dashboard</h3>
            <p className="text-red-700">
              You have full control over the election system. You can start/stop elections and view results.
            </p>
          </div>
        );
      case 'COORDINATOR':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Coordinator Dashboard</h3>
            <p className="text-purple-700">
              You can manage candidates by adding or removing them from the election.
            </p>
          </div>
        );
      case 'CANDIDATE':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Candidate Dashboard</h3>
            <p className="text-green-700">
              You can follow candidate information for the current election.
            </p>
          </div>
        );
      case 'VOTER':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Voter Dashboard</h3>
            <p className="text-blue-700">
              You can cast your vote for your preferred candidate. Each voter can only vote once.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of the current election system status.
        </p>
      </div>

      {/* Role-specific content */}
      {getRoleSpecificContent()}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getDashboardStats().map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Election started successfully</p>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-700">New candidate registered</p>
            <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
          </div>
          {user?.role === 'ADMIN' && (
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-700">Vote totals updated</p>
              <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
