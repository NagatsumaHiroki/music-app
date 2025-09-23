import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-white" />
    </div>
  );
}
