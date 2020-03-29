import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      history.push('/profile');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error: ', error.message);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          {/* eslint-disable-next-line max-len */}
          <p>Descreva o caso detalhadament para encontrar um novo heroi para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Profile
          </Link>
        </section>

        <form>
          <input
            placeholder="Titulo do Caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
