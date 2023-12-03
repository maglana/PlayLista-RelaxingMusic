import { useState, useEffect, useRef } from "react";
import "./App.css";

const APImusic = "/assets/api.json";

function App() {
	const [music, setMusic] = useState([]);
	const [playLista, setPlayLista] = useState(0);
	const audioRef = useRef();

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = music[playLista].audio;
			audioRef.current.load();
		}
	}, [playLista, setPlayLista]);

	useEffect(() => {
		fetch(APImusic).then((response) => {
			if (response.ok) {
				response.json().then(setMusic);
			}
		});
	}, []);

	if (music.length < 1) {
		return (
			<div>
				Loader...<i class='fa-solid fa-spinner'></i>
			</div>
		);
	}

	return (
		<div className='app'>
			<div className='phone'>
				<div className=' text-white flex-col m-auto justify-center bg-gray-900 items-center'>
					<section className='bg-black text-white text-center p-8'>
						<h1 className='text-3xl font-bold mb-4'>
							<i class='fa-solid fa-headphones'></i> Play lista - RELAXING Music
						</h1>
						<img
							src={music[playLista].cover}
							className='shadow-lg my-4 w-64 mx-auto object-cover'
						/>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white rounded-full cursor-pointer py-2 px-4 mr-4'
							onClick={() => audioRef.current.play()}
						>
							<i class='fa-solid fa-circle-play'></i> Play
						</button>
						<button
							className='bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-full py-2 px-4'
							onClick={() => audioRef.current.pause()}
						>
							<i class='fa-solid fa-circle-pause'></i> Pausa
						</button>
						<audio ref={audioRef}>
							<source src={music[playLista].audio} />
						</audio>
					</section>
					<section>
						<h1 className='text-center text-2xl font-semibold mb-4 custom '>
							PLAY LISTA:
						</h1>
						<ul className='flex flex-col space-y-2 '>
							{music.map((musics, key) => (
								<li
									key={musics.id}
									onClick={() => setPlayLista(key)}
									className={`text-center cursor-pointer rounded-lg hover:bg-gray-800 py-2 px-4 ${
										music[playLista].id === musics.id
											? "bg-gray-700"
											: "bg-gray-800"
									}`}
								>
									{musics.title} by {musics.author}
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

export default App;
