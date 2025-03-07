import React from 'react';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price }) => {
    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Preço: R$ {price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;
