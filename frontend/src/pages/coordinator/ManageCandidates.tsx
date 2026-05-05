import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserMinus, Users} from 'lucide-react';
import { candidateService } from '../../services/candidateService';
import { voteService } from '../../services/voteService';
import Modal from '../../components/common/Modal';
import { CandidateView} from '../../types';
import toast from 'react-hot-toast';

const ManageCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateView[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateView | null>(null);
  const [newCandidateUserId, setNewCandidateUserId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleAddCandidate = async () => {
    if (!newCandidateUserId.trim()) {
      toast.error('Please enter a user ID');
      return;
    }

    setActionLoading(true);
    try {
      await candidateService.createCandidate({ userId: newCandidateUserId });
      
      // Add to local state (in real app, refetch from API)
      const newCandidate: CandidateView = {
        id: String(Date.now()),
        userId: newCandidateUserId,
        name: `User ${newCandidateUserId}`
      };
      setCandidates(prev => [...prev, newCandidate]);
      
      toast.success('Candidate added successfully!');
      setShowAddModal(false);
      setNewCandidateUserId('');
    } catch (error) {
      toast.error('Failed to add candidate');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveCandidate = async () => {
    if (!selectedCandidate) return;

    setActionLoading(true);
    try {
      await candidateService.removeCandidate({ candidateId: selectedCandidate.userId });
      
      // Remove from local state
      setCandidates(prev => prev.filter(c => c.userId !== selectedCandidate.userId));
      
      toast.success('Candidate removed successfully!');
      setShowRemoveModal(false);
      setSelectedCandidate(null);
    } catch (error) {
      toast.error('Failed to remove candidate');
    } finally {
      setActionLoading(false);
    }
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Candidates</h1>
          <p className="text-gray-600 mt-2">
            Add or remove candidates from the election.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Candidate</span>
        </motion.button>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 rounded-full p-3">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-gray-500">ID: {candidate.id}</p>
                <p className="text-sm text-gray-500">User ID: {candidate.userId}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCandidate(candidate);
                setShowRemoveModal(true);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
            >
              <UserMinus className="h-4 w-4" />
              <span>Remove Candidate</span>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new candidate.</p>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="-ml-1 mr-2 h-5 w-5" />
              Add Candidate
            </motion.button>
          </div>
        </div>
      )}

      {/* Add Candidate Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => !actionLoading && setShowAddModal(false)}
        title="Add New Candidate"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={newCandidateUserId}
              onChange={(e) => setNewCandidateUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter user ID to make them a candidate"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddCandidate}
              disabled={actionLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {actionLoading ? 'Adding...' : 'Add Candidate'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(false)}
              disabled={actionLoading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Remove Candidate Modal */}
      <Modal
        isOpen={showRemoveModal}
        onClose={() => !actionLoading && setShowRemoveModal(false)}
        title="Remove Candidate"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to remove <strong>{selectedCandidate?.name}</strong> from the election?
            This action cannot be undone.
          </p>
          <div className="flex space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRemoveCandidate}
              disabled={actionLoading}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? 'Removing...' : 'Remove Candidate'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowRemoveModal(false)}
              disabled={actionLoading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default ManageCandidates;
