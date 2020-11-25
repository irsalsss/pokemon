import React, { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from "react-router-dom";
import Modal from '../components/shared/Modal';
import Pokeball from '../../public/assets/img/pokeball.png';
import './DetailPage.scss';
import Button from '../components/shared/Button';
import TitlePage from '../components/shared/TitlePage';

const DetailPage = () => {
  const { id } = useParams()
  const {
    myPokemonData, showModal, singlePokemonData, isPokemonCaught,
    catchPokemon, fetchPokemonById, setStateMyPokemonData
  } = usePokemon();

  useEffect(() => {
    if (id){
      fetchPokemonById(id)
    }

    if (myPokemonData.length == 0){
      setStateMyPokemonData()
    }
  }, [])

  return (
    <div className='container-detail-page'>
      {Object.keys(singlePokemonData).length !== 0 && (
        <React.Fragment>
          <TitlePage title={singlePokemonData.name} />

          <div className='image-wrapper'>
            <img className='mx-2' alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.front_default} />
            <img className='mx-2' alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.back_default} />
          </div>

          <div className='pokemon-information'>
            <div className='wrapper-information'>
              <b>Types:</b>

              <div className='list'>
                {singlePokemonData?.types.map((type, idx) => (
                  <p className='ml-2' key={idx}>{type.type.name}{idx !== singlePokemonData.types.length - 1 ? ',' : ''}</p>
                ))}
              </div>
            </div>

            <div className='wrapper-information'>
              <b>Moves:</b>

              <div className='list'>
                {singlePokemonData?.moves.map((move, idx) => (
                  <p className='ml-2' key={idx}>{move.move.name}{idx !== singlePokemonData.moves.length - 1 ? ',' : ''}</p>
                ))}
              </div>
            </div>
          </div>

          <div data-cy={`container-button-catcher-${singlePokemonData.id}`} className='flex-column-center catch-container'>
            <p className='text-catch'>catch the pokemon</p>
            <img onClick={() => catchPokemon()} className='img-pokeball' alt='catch pokemon button' width='60px' height='60px' src={Pokeball} />
          </div>

        </React.Fragment>
      )}

      {showModal && isPokemonCaught && (
        <ModalSuccess />
      )}

      {showModal && !isPokemonCaught && (
        <ModalFailure />
      )}
    </div>
  )
}

const ModalSuccess = () => {
  const { myPokemonData, username, singlePokemonData, addMyPokemon, onChangePokemon, closeModal } = usePokemon();
  const [isError, setIsError] = useState(false);

  const onSubmit = () => {
    if (myPokemonData){
      const isUsernameAlreadyTaken = myPokemonData.some(data => data.username == username)
      if (isUsernameAlreadyTaken) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2000);
        return;
      };
    }

    setIsError(false);
    addMyPokemon({ name: singlePokemonData.name, username: username, id: singlePokemonData.id })
  }

  return (
    <Modal closeModal={closeModal}>
      <React.Fragment>
        <h2 data-cy="modal-title" className='mb-3'>Success!</h2>

        <div className='container-input-username'>
          <label className='mb-3' htmlFor='username'>Please give a username for your new pokemon</label>
          <input
            data-cy="input-username"
            autoFocus
            onChange={(e) => onChangePokemon('username', e.target.value)}
            className='input-username mb-2'
            maxLength='24'
            id='username'
            type='text'
            placeholder='your new pokemon username'
          />

          <p className='color-red'>{isError ? "Oops username can't be the same" : ""}</p>
        </div>

        <Button
          datacy='button-username'
          disabled={!username}
          onClick={() => onSubmit()}
          customClassName='btn-primary modal-button'
        >
          Okay
        </Button>
      </React.Fragment>
    </Modal>
  )
}

const ModalFailure = () => {
  const { closeModal } = usePokemon()
  return (
    <Modal closeModal={closeModal}>
      <React.Fragment>
        <h2 data-cy="modal-title" className='mb-3'>Failed!</h2>
        <p className='mb-3'>Please try again...</p>
        <Button datacy="button-close" customClassName='btn-secondary modal-button' onClick={closeModal}>Okay</Button>
      </React.Fragment>
    </Modal>
  )
}

export default DetailPage;