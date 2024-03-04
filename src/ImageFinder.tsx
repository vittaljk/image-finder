import React, { useState, useEffect } from 'react';

interface ApiResponse {
    collection: {
        items: ImageItem[];
    };
}

interface ImageItem {
    links?: ImageLink[];
}

interface ImageLink {
    render?: string;
    href?: string;
}

const ImageFinder: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://images-api.nasa.gov/search?q=moon');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: ApiResponse = await response.json();
                if (data?.collection?.items) {
                    const items = data.collection.items
                        .filter(item => item.links)
                        .flatMap(item => item.links || [])
                        .filter(link => link.render === 'image')
                        .map(image => image.href || '');
                    setImages(items);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {images.length > 0 ? (
                images.map(image => (
                    <img key={image} src={image} alt="" />
                ))
            ) : (
                <div>No images found</div>
            )}
        </div>
    );
};

export default ImageFinder;