'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Produto } from '../types/produto';
import api from '../lib/api';

export function useProdutos() {
    const router = useRouter();
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        api.get<Produto[]>('/produtos').then(response => {
            setProdutos(response.data);
        });
    }, []);

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            api.delete(`/produtos/${id}`).then(() => {
                setProdutos(produtosAtuais => produtosAtuais.filter(p => p.id !== id));
                Swal.fire('Excluído!', 'O produto foi excluído.', 'success');
            });
        }
    };

    const handleAdd = () => router.push('/produtos/cadastro');
    const handleEdit = (id: number) => router.push(`/produtos/editar/${id}`);

    return { produtos, handleDelete, handleAdd, handleEdit };
}