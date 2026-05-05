import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { voteService } from '../../services/voteService';
import CandidateCard from '../../components/voting/CandidateCard';
import { CandidateView} from '../../types';
import toast from 'react-hot-toast';

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const fetchCandidates = async () => {
      try {
          const data = await voteService.getCandidates();
          const mapped = data.map((item: CandidateView) => ({
                    id : item.id,
                    userId: item.userId,
                    name : item.name,
                 }));
          setCandidates(mapped);
      } catch (error) {
        toast.error('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
        <h1 className="text-3xl font-bold text-gray-900">Election Candidates</h1>
        <p className="text-gray-600 mt-2">
          View all candidates participating in the current election.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CandidateCard
              candidate={candidate}
              canVote={false}
            />
          </motion.div>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No candidates available at the moment.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Candidates;
