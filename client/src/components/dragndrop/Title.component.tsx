import './draganddrop.css';

interface IProps {
    title: string;
}

export const Title = ({title}: IProps) => {
    return (
        <div className="title flex">
            <h2>{title}</h2>
        </div>
    )
}
