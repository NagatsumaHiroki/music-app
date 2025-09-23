import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface SearchInputProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function SearchInput({ onInputChange, onSubmit, isLoading = false }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <section className="mb-10">
      <div className="flex justify-center">
        <div className="flex w-full max-w-md">
          <input
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            className="bg-gray-700 flex-1 p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
            placeholder="探したい曲名を入力してください"
            disabled={isLoading}
          />
          <button 
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
