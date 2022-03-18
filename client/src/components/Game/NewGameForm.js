import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isEmpty, timestampParser} from "../Utils";
import {NavLink} from "react-router-dom";
import {addGame, getGames} from "../../actions/game.actions";

const NewGameForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [gamePicture, setGamePicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.gameError);
    const dispatch = useDispatch();

    const handleGame = async () => {
        if (description || gamePicture || video) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('description', description);
            if (file) data.append("file", file);
            data.append('video', video);

            await dispatch(addGame(data));
            dispatch(getGames());
            cancelGame();
        } else {
            alert("Veuillez entrer une description")
        }
    };

    const handlePicture = (e) => {
        setGamePicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    };

    const cancelGame = () => {
        setDescription("");
        setGamePicture("");
        setVideo("");
        setFile("");
    };


    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);

        const handleVideo = () => {
            let findLink = description.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setDescription(findLink.join(" "));
                    setGamePicture('');
                }
            }
        };
        handleVideo();
    }, [userData, description, video]);

    return (
        <div className="game-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"/>
            ) : (
                <>
                    <div className="gameform-info">
                        <img src="./img/icons/addGame.png" alt="user-img"/>
                        <span> Partage ton jeu !</span>
                    </div>
                    <div className="game-form">
                        <span>Titre</span>
                        <br/>
                        <textarea
                            name="titre"
                            id="titre"
                            placeholder="Titre du jeu"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Auteurs</span>
                        <br/>
                        <textarea
                            name="authors"
                            id="authors"
                            placeholder="Auteurs du jeu"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Description</span>
                        <br/>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Décrivez votre jeu"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>version</span>
                        <br/>
                        <textarea
                            name="version"
                            id="version"
                            placeholder="Version du jeu: ex release-2.1.3"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Prix</span>
                        <br/>
                        <textarea
                            name="price"
                            id="price"
                            placeholder="Exemple: {true, 59.99}"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Age</span>
                        <br/>
                        <textarea
                            name="pegi"
                            id="pegi"
                            placeholder="Age requis pour jouer"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <span>Genre</span>
                        <br/>
                        <textarea
                            name="tags"
                            id="tags"
                            placeholder="Exemple: [action, RPG, FPS, arcade]"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        {description || gamePicture || video.length > 20 ? (
                            <li className="cardgame-container">
                                <div className="cardgame-left">
                                    <img src={userData.picture} alt="user-pic"/>
                                </div>
                                <div className="cardgame-right">
                                    <div className="cardgame-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{description}</p>
                                        <img src={gamePicture} alt=""/>
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            />
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className="footergame-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img"/>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                            </div>

                            <div className="btn-send">
                                {description || gamePicture || video.length > 20 ? (
                                    <button className="cancel" onClick={cancelGame}>
                                        Annuler message
                                    </button>
                                ) : null}
                                <button className="send" onClick={handleGame}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewGameForm;