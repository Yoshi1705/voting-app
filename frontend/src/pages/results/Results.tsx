import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, BarChart3 } from 'lucide-react';
import { adminService } from '../../services/adminService';
import toast from 'react-hot-toast';
import { ResultsResponse } from '../../types';
import { dashboardService } from '../../services/dashboardService';

 

const Results: React.FC = () => {
  const [results, setResults] = useState<ResultsResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const [electionstatus, setElectionStatus] = useState(false);

  const totalVotes = results?.reduce((sum, r) => sum + r.votes, 0) || 0;
  console.log("totalVotes",totalVotes)

   useEffect(() => {
     const fetchData = async () => {
       try{
         setLoading(true);
         const status = await dashboardService.getElectionStatus();
         setElectionStatus(status);

          if (status) {
          setMessage("Election is ongoing. Results cannot be accessed now.");
          setResults([]);
          return;
        }
        const data = await adminService.getResults();
        const mapped = data.map((item : ResultsResponse) => ({
        candidateName: item.candidateName,
        votes: item.votes,
        role: item.role
        }));
       setResults(mapped);
       }catch(error){
        toast.error("failed to load election results");
       }finally{
        setLoading(false);
       }
     };
     fetchData();
   }, [])
 
  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1: return <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>;
      case 2: return <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>;
      default: return <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">{index + 1}</div>;
    }
  };

  const getCardBorder = (index: number) => {
    switch (index) {
      case 0: return 'border-yellow-200 bg-yellow-50';
      case 1: return 'border-gray-200 bg-gray-50';
      case 2: return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No results available at the moment.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Election Results</h1>
        <p className="text-gray-600 mt-2">
          Final results of the election voting process.
        </p>
      </div>

      {message && (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        {message}
      </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Votes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalVotes}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Candidates</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{results.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 capitalize">{electionstatus? "Started": "Not Started"}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Trophy className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
  <h2 className="text-xl font-semibold text-gray-900">Vote Distribution</h2>

  {results?.map((result, index) => {

    const percentage = totalVotes
      ? (result.votes / totalVotes) * 100
      : 0;

    return (
      <motion.div
        key={result.candidateName}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`border-2 rounded-lg p-6 ${getCardBorder(index)}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getPositionIcon(index)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {result.candidateName}
              </h3>
              <p className="text-sm text-gray-600">
                {result.votes} votes
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {percentage.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className={`h-2 rounded-full ${
                index === 0
                  ? 'bg-yellow-500'
                  : index === 1
                  ? 'bg-gray-400'
                  : index === 2
                  ? 'bg-orange-400'
                  : 'bg-blue-400'
              }`}
            />
          </div>
        </div>
      </motion.div>
    );
  })}
 </div>
    </motion.div>
  );
};

export default Results;