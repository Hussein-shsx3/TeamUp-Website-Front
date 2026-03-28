interface BioCardProps {
  bio: string;
}

const BioCard = ({ bio }: BioCardProps) => {
  return (
    <div className="border-t border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
      <p className="mb-2 font-primary text-sm font-semibold text-content">
        Bio
      </p>
      <p className="break-words font-primary text-sm leading-relaxed text-content-light">
        {bio}
      </p>
    </div>
  );
};

export default BioCard;
