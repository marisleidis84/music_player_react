import { useRef, useState } from "react";

const MusicPlayer = () => {
    let [reproducing, setReproducing] = useState(false);
    const [songs] = useState([
        { id: 1, category: "game", name: "Mario Castle", url: "files/mario/songs/castle.mp3" },
        { id: 2, category: "game", name: "Mario Star", url: "files/mario/songs/hurry-starman.mp3" },
        { id: 3, category: "game", name: "Mario Overworld", url: "files/mario/songs/overworld.mp3" }
    ]);
    let player = useRef(null);
    let [actualIndex, setactualIndex] = useState(null);


    function link(url, i) {
        setactualIndex(actualIndex = i);
        player.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
        setReproducing(true);
    }

    function playButton() {
        if (actualIndex === null) {
            setReproducing(reproducing = true);
            link(songs[0].url, 0)
            player.current.play();
        }
        else{
            let continua = actualIndex;
             link(songs[continua].url, continua)
            player.current.play(); 
        }
    };

    function pauseButton() {
        setReproducing(false);
        player.current.pause();
    }

    function buttonPlayPause() {
        (reproducing === false) ? playButton() : pauseButton();

    }

    function nextButton() {
        let next1;
        if (actualIndex == null) {
            next1 = 0;
            link(songs[next1].url, next1);
        }
        else if (actualIndex === songs.length - 1) {
            setactualIndex(actualIndex = 0);
            next1 = actualIndex;
            link(songs[next1].url, next1);
        }
        else {
            setactualIndex(actualIndex++);
            next1 = actualIndex;
            link(songs[next1].url, next1);
        }
    }

    function previewButton() {
        let prev;
        if (actualIndex == null) {
            prev = 0;
            link(songs[prev].url, prev);
        } else if (actualIndex === 0) {
            setactualIndex(actualIndex = 2);
            prev = actualIndex;
            link(songs[prev].url, prev);
        }
        else {
            setactualIndex(actualIndex--);
            prev = actualIndex;
            link(songs[prev].url, prev);
        }
    }

    return (
        <div className=" container">
            <div className="card-body">
                <ul className="list-group" style={{ cursor: 'pointer' }}>
                    {
                        songs.map((val, i) => {
                            return <li className="list-group-item list-group-item-action bg-light" key={i} onClick={(e) => link(val.url, i)}>
                                {val.name}
                            </li>
                        })
                    }
                </ul>
                <audio id='audio' ref={player} autoPlay type="audio/mp3" />

                <div className="card-footer d-flex justify-content-center bg-secondary">
                    <button className="btn btn-secondary fa  fa-step-backward" type="button" onClick={() => previewButton()} ></button>
                    <button className={"btn btn-secondary fa " + ((reproducing) ? 'fa-pause' : 'fa-play')} type="button" onClick={() => buttonPlayPause()}></button>
                    <button className="btn btn-secondary fa fa-step-forward" type="button" onClick={() => nextButton()}></button>
                </div>
            </div>
        </div>
    );
}



export default MusicPlayer;