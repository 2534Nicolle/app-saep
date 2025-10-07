'use client'
import NavBar from '@/app/components/navbar';
import FormularioProduto from '../../../../components/FormularioProduto';
import { withAuth } from '@/app/components/withAuth';

function Pagina Edicao({ params }: { params: { id: string } }) {
    return (
        <section className='h-screen'>
            <NavBar texto={"Edição de Produto"} />
            <FormularioProduto id={params.id} />
        </section>
    );
};

export default withAuth(PaginaEdicao);