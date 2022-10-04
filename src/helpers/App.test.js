import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

afterEach(() => jest.clearAllMocks());

const dataTestIdEmail = 'email-input';
const dataTestIdPassword = 'password-input';

describe('Teste component APP', () => {
  test('Verifica se os inputs são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const passwordInput = screen.getByTestId(dataTestIdPassword);

    expect(inputEmail).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  test('Verifica se um button com valor Entrar é renderizado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttonEntrar).toBeInTheDocument();
  });
  test('verifica se é possivel digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const msgInput = 'Digitando...';
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const passwordInput = screen.getByTestId(dataTestIdPassword);

    userEvent.type(inputEmail, msgInput);
    userEvent.type(passwordInput, msgInput);

    expect(screen.queryByText(msgInput)).not.toBeInTheDocument();
  });
  test('Verifica se ao clicar no botao entrar, a pagina /carteira é carregada', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const passwordInput = screen.getByTestId(dataTestIdPassword);
    const buttonEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail, 'alguem@alguem.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(buttonEntrar);

    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
});
