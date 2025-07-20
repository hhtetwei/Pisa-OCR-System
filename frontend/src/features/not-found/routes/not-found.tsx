
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { FaHome, FaStethoscope } from 'react-icons/fa';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 text-center space-y-6 dark:border-gray-800">
        <div className="space-y-2">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mx-auto flex items-center justify-center">
            <FaStethoscope className="w-8 h-8 text-primary-600 dark:text-primary-300" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-100">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't find the page you're looking for. The link might be incorrect or the page
            may have been moved.
          </p>
        </div>
        <Button leftIcon={<FaHome className="text-xl" />} onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  );
};
