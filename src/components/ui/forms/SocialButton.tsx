interface SocialButtonProps {
  label: string;
  onClick?: () => void;
}

const SocialButton = ({ label, onClick }: SocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-3 border border-primary rounded-lg font-primary text-sm
        font-medium hover:border-primary text-primary
        hover:bg-primary-light transition-all duration-200 w-full"
    >
      {label}
    </button>
  );
};

export default SocialButton;
