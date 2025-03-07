import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // Função para buscar produtos da API
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products'); // Chama o endpoint do backend
            setProducts(response.data);
        } catch (error) {
            alert('Erro ao buscar produtos');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); // Executa apenas uma vez ao carregar a página

    return (
        <div>
            <h1>Produtos</h1>
            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
