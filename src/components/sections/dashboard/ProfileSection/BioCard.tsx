interface BioCardProps {
  bio: string;
}

const BioCard = ({ bio }: BioCardProps) => {
  return (
    <div className="border border-gray-100 px-4 py-4 sm:px-6 sm:py-5 rounded-lg">
      <p className="mb-2 font-primary font-semibold text-content">
        Bio
      </p>
      <p className="break-words font-primary text-sm leading-relaxed text-content-light">
        {bio}
      </p>
    </div>
  );
};

export default BioCard;
