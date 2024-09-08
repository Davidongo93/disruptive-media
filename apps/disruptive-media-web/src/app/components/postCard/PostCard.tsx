import Image from 'next/image';

interface PostCardProps {
  title: string;
  topic: { _id: string, name: string };
  category: { _id: string, name: string };
  url: string;
  credits: string;
  isLoggedIn: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ title, topic, category, url, credits, isLoggedIn }) => {
  const renderContent = () => {
    if (category.name === 'image') {
      return (
        <div className={isLoggedIn ? '' : 'filter blur-lg'}>
          <Image
            src={url}
            alt={title}
            width={320}
            height={240}
            className="w-full h-48 object-cover"
          />
        </div>
      );
    } else if (category.name === 'video') {
      return (
        <div className={isLoggedIn ? '' : 'filter blur-lg'}>
        <iframe
          src={url}
          title={title}
          className="w-full h-48"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        </div>
      );
    } else if (category.name === 'text') {
      return (
        <div className={isLoggedIn ? '' : 'filter blur-lg'}>
        <div className="p-4 bg-gray-100 text-sm text-gray-700">
          <p>{url}</p> {/* Si el texto está almacenado en `url` */}
        </div>
        </div>
      );
    } else {
      return <div>Unsupported content type</div>;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {renderContent()}
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        {isLoggedIn && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Topic: {topic.name}</p>
            <p className="text-sm text-gray-500">Category: {category.name}</p>
            <p className="text-sm text-gray-500">Credits: {credits}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
