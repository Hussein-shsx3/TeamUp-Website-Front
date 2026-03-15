interface UniversityButtonProps {
  onClick?: () => void;
}

const UniversityButton = ({ onClick }: UniversityButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3.5 bg-primary text-white text-sm font-medium font-primary tracking-wide
        rounded-lg hover:bg-primary-dark transition-colors duration-200"
    >
      Continue with University Account
    </button>
  );
};

export default UniversityButton;
