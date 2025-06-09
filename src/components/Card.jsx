const Card = ({ imageUrl, name, title, description }) => (
  <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center">
    <img src={imageUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full object-cover" />
    <h3 className="mt-4 text-xl font-bold">{name}</h3>
    <p className="text-gray-400">{title}</p>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

export default Card;
