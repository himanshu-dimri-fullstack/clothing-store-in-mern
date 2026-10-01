import { useParams } from 'react-router-dom';
import CategoryForm from '../../components/CategoryForm';

const Edit = () => {
    const { slug } = useParams()

    return (
        <div>
            <CategoryForm slug={slug} />
        </div>
    )
}

export default Edit