import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, url, date, handleDeleteNote }) => {
	return (
		<div className='note'>
			<span>{text}</span>
			<img src={url} alt="pic"  />
			<div className='note-footer'>
				<small>{date}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;
