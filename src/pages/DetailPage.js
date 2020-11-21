import React, { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from "react-router-dom";
import Modal from '../components/shared/Modal';
import Pokeball from '../../public/assets/img/pokeball.png';
import './DetailPage.scss';
import Button from '../components/shared/Button';

const DetailPage = () => {
  const { id } = useParams()
  const { showModal, singlePokemonData, isPokemonCaught, catchPokemon, fetchPokemonById } = usePokemon();

  useEffect(() => {
    if (id){
      fetchPokemonById(id)
    }
  }, [])

  return (
    <div className='container-detail-page'>
      {Object.keys(singlePokemonData).length !== 0 && (
        <React.Fragment>
          <h2 className='title-page'>{singlePokemonData.name}</h2>

          <div className='image-wrapper'>
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.front_default} />
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.back_default} />
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

          <div className='catch-container'>
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
  const { username, singlePokemonData, addMyPokemon, onChangePokemon, closeModal } = usePokemon()
  return (
    <Modal closeModal={closeModal}>
      <React.Fragment>
        <h2 className='mb-3'>Success!</h2>

        <div className='container-input-username'>
          <label className='mb-3' htmlFor='username'>Please give a username for your new pokemon</label>
          <input
            onChange={(e) => onChangePokemon('username', e.target.value)}
            className='input-username'
            maxLength='32'
            id='username'
            type='text'
            placeholder='your new pokemon username'
          />
        </div>

        <Button
          onClick={() => addMyPokemon({
            name: singlePokemonData.name,
            username: username,
            id: singlePokemonData.id
          })}
          customClassName='btn-primary modal-button'
        >Okay
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
        <h2 className='mb-3'>Failed!</h2>
        <p className='mb-3'>Please try again...</p>
        <Button customClassName='btn-secondary modal-button' onClick={closeModal}>Okay</Button>
      </React.Fragment>
    </Modal>
  )
}

export default DetailPage;